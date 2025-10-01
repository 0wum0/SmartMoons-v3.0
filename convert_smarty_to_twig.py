#!/usr/bin/env python3
"""
Smarty to Twig Template Converter
Converts Smarty .tpl templates to Twig .twig templates
"""

import re
import sys
import os

def convert_smarty_to_twig(content):
    """Convert Smarty syntax to Twig syntax"""
    
    # Include statements
    content = re.sub(r'\{include file="([^"]+)\.tpl"\}', r'{% include "\1.twig" %}', content)
    
    # Foreachelse
    content = re.sub(r'\{foreachelse\}', r'{% else %}', content)
    
    # If statements
    content = re.sub(r'\{if\s+(.+?)\}', lambda m: convert_if_condition(m.group(1)), content)
    content = re.sub(r'\{elseif\s+(.+?)\}', lambda m: convert_elseif_condition(m.group(1)), content)
    content = re.sub(r'\{else\}', r'{% else %}', content)
    content = re.sub(r'\{/if\}', r'{% endif %}', content)
    
    # Foreach loops
    content = re.sub(r'\{foreach\s+(?:item|from)=\$(\w+)\s+(?:from|item)=\$(\w+)(?:\s+key=\$(\w+))?\}', 
                     lambda m: convert_foreach(m), content)
    content = re.sub(r'\{foreach\s+\$(\w+)\s+as\s+\$(\w+)(?:\s*=>\s*\$(\w+))?\}',
                     lambda m: convert_foreach_as(m), content)
    content = re.sub(r'\{/foreach\}', r'{% endfor %}', content)
    
    # For loops
    content = re.sub(r'\{for\s+\$(\w+)=(\d+)\s+to\s+(\d+)(?:\s+step\s+(\d+))?\}',
                     r'{% for \1 in range(\2, \3 + 1, \4|default(1)) %}', content)
    content = re.sub(r'\{/for\}', r'{% endfor %}', content)
    
    # Variables with array/object access
    content = re.sub(r'\{\$(\w+)\.(\w+)\.(\w+)\}', r'{{ \1.\2.\3 }}', content)
    content = re.sub(r'\{\$(\w+)\.(\w+)\}', r'{{ \1.\2 }}', content)
    content = re.sub(r'\{\$(\w+)\[\'(\w+)\'\]\}', r'{{ \1["\2"] }}', content)
    content = re.sub(r'\{\$(\w+)\["(\w+)"\]\}', r'{{ \1["\2"] }}', content)
    
    # Simple variables
    content = re.sub(r'\{\$(\w+)\}', r'{{ \1 }}', content)
    
    # Special smarty variables
    content = re.sub(r'\{\$smarty\.get\.(\w+)\|?(\w*)\|?(\w*)\}',
                     r'{{ app.request.get("\1")|default("intro") }}', content)
    content = re.sub(r'\{\$smarty\.(\w+)\.(\w+)\}', r'{{ app.\1.\2 }}', content)
    
    # Filters/modifiers
    content = re.sub(r'\{\$(\w+)\|escape\}', r'{{ \1|e }}', content)
    content = re.sub(r'\{\$(\w+\.\w+)\|escape\}', r'{{ \1|e }}', content)
    content = re.sub(r'\|default:\'([^\']+)\'', r'|default("\1")', content)
    content = re.sub(r'\|default:"([^"]+)"', r'|default("\1")', content)
    
    # html_options (convert to Twig loop)
    content = re.sub(r'\{html_options options=\$(\w+) selected=\$(\w+)\}',
                     lambda m: convert_html_options(m.group(1), m.group(2)), content)
    
    # nocache tags (remove in Twig)
    content = re.sub(r'\{nocache\}', '', content)
    content = re.sub(r'\{/nocache\}', '', content)
    
    # Block tags (with optional prepend/append)
    content = re.sub(r'\{block name="(\w+)"(?:\s+prepend)?\}', r'{% block \1 %}', content)
    content = re.sub(r'\{/block\}', r'{% endblock %}', content)
    
    # Comments
    content = re.sub(r'\{\*(.+?)\*\}', r'{# \1 #}', content, flags=re.DOTALL)
    
    # Assign (not needed in Twig templates usually, convert to set)
    content = re.sub(r'\{assign var="(\w+)" value="([^"]+)"\}', r'{% set \1 = "\2" %}', content)
    
    return content

def convert_if_condition(condition):
    """Convert Smarty if condition to Twig"""
    # Remove $ from variables
    condition = re.sub(r'\$(\w+)', r'\1', condition)
    
    # Convert operators
    condition = condition.replace(' eq ', ' == ')
    condition = condition.replace(' ne ', ' != ')
    condition = condition.replace(' neq ', ' != ')
    condition = condition.replace(' gt ', ' > ')
    condition = condition.replace(' lt ', ' < ')
    condition = condition.replace(' gte ', ' >= ')
    condition = condition.replace(' lte ', ' <= ')
    condition = condition.replace(' and ', ' and ')
    condition = condition.replace(' or ', ' or ')
    condition = condition.replace(' not ', ' not ')
    condition = condition.replace('!empty(', '')
    condition = condition.replace(')', '')
    
    # Handle isset
    if 'isset(' in condition:
        condition = re.sub(r'isset\((\w+)\)', r'\1 is defined', condition)
    
    # Handle empty check
    if '!' in condition and 'is defined' not in condition:
        condition = condition.replace('!', '') + ' is not empty'
    
    return '{% if ' + condition + ' %}'

def convert_elseif_condition(condition):
    """Convert Smarty elseif condition to Twig"""
    if_part = convert_if_condition(condition)
    return if_part.replace('{% if ', '{% elseif ')

def convert_foreach(match):
    """Convert Smarty foreach to Twig for loop"""
    groups = match.groups()
    if len(groups) == 3 and groups[2]:
        # Has key
        return '{% for {}, {} in {} %}'.format(groups[2], groups[0], groups[1])
    else:
        # No key
        return '{% for {} in {} %}'.format(groups[0], groups[1])

def convert_foreach_as(match):
    """Convert Smarty foreach with 'as' syntax to Twig"""
    groups = match.groups()
    if len(groups) == 3 and groups[2]:
        # Array with key => value
        return '{% for {}, {} in {} %}'.format(groups[1], groups[2], groups[0])
    else:
        # Simple array
        return '{% for {} in {} %}'.format(groups[1], groups[0])

def convert_html_options(options_var, selected_var):
    """Convert Smarty html_options to Twig loop"""
    return (
        '{% for key, value in ' + options_var + ' %}'
        '<option value="{{ key }}"{% if key == ' + selected_var + ' %} selected{% endif %}>'
        '{{ value }}</option>{% endfor %}'
    )

def convert_file(filepath):
    """Convert a single Smarty template file to Twig"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Convert content
        twig_content = convert_smarty_to_twig(content)
        
        # Generate new filepath (.tpl -> .twig)
        twig_filepath = filepath.replace('.tpl', '.twig')
        
        # Write converted file
        with open(twig_filepath, 'w', encoding='utf-8') as f:
            f.write(twig_content)
        
        print(f"✓ Converted: {filepath} -> {twig_filepath}")
        return True
    except Exception as e:
        print(f"✗ Error converting {filepath}: {e}")
        return False

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 convert_smarty_to_twig.py <template_file_or_directory>")
        sys.exit(1)
    
    path = sys.argv[1]
    
    if os.path.isfile(path):
        # Convert single file
        convert_file(path)
    elif os.path.isdir(path):
        # Convert all .tpl files in directory
        for root, dirs, files in os.walk(path):
            for file in files:
                if file.endswith('.tpl'):
                    filepath = os.path.join(root, file)
                    convert_file(filepath)
    else:
        print(f"Error: {path} is not a valid file or directory")
        sys.exit(1)

if __name__ == '__main__':
    main()
