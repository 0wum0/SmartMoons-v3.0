### _v3.2.2	0wum0 01.10.2025_
[Modules] :
- none

[Bugs] :
- Fix: Corrected escaped HTML output in Twig templates with |raw filter
- Fix: System requirements page now displays formatted status indicators (green/red)
- Fix: Install templates (ins_req.twig, ins_header.twig, ins_step4.twig, ins_step8error.twig)
- Fix: PHP version, PDO, GD, JSON, ini_set checks now properly display HTML formatting
- Fix: Directory permissions and config file checks now show proper color coding
- Fix: Error messages in installer now display with intended HTML structure

[Improvements] :
- Enhanced installer UX with proper visual feedback (color-coded status indicators)
- Improved security documentation for |raw filter usage in templates
- Added comprehensive fix report (TWIG_RAW_FILTER_FIX_v3.2.2.md)

[Optimization] :
- none

[Design] :
- Restored visual formatting in installer system requirements display
- Green/red status indicators now properly visible

[Panel administration] :
- none

### _v3.1.2	0wum0 01.10.2025_
[Modules] :
- none

[Bugs] :
- Fix: Corrected Twig syntax error in ins_header.twig (smarty is defined → GET.step is defined)
- Fix: Corrected Twig syntax error in overall_footer.twig (smarty is defined → GET.reload is defined)
- Fix: Corrected deprecated |escape filter usage in main.header.twig (login and game)
- Fix: Corrected deprecated |escape filter usage in page.galaxy.default.twig
- Fix: Corrected deprecated |escape filter usage in page.chat.default.twig
- Fix: Corrected deprecated default: syntax in MessageList.twig (default:'' → default(''))
- Fix: Corrected queryString variable escaping to use proper JSON encoding

[Improvements] :
- Improved Twig template compatibility with Twig 3.x standards
- Enhanced template security with proper escaping functions

[Optimization] :
- none

[Design] :
- none

[Panel administration] :
- none

### _v2.0.1	Danter14 14.08.2018_
[Modules] :
- none

[Bugs] :
- none

[Improvements] :
- none

[Optimization] :
- none

[Design] :
- none

[Panel administration] :
- none

### _v2.0.0	Danter14 17.02.2018_
[Modules] :
- Percentage with bar and text for real-time resources
- Number of players connect
- Planet change with arrows

[Bugs] :
- Fix of the language buddyList
- Fix bug for debris fields on the moon that replace the fields already in place by byazrail
- Fix bug, with destroyed moon by Kaizoku

[Improvements] :
- Ability to make high speed server

[Optimization] :
- Switching to php version 7.2

[Design] :
- Redesign of the bootstrap 4 login page
- Redesign Ingame by Danter14

[Panel administration] :
- none