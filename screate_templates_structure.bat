@echo off
REM Create the templates folder if it doesn't exist
IF NOT EXIST templates (
    mkdir templates
)

cd templates

REM Create main HTML files
(for %%f in (
    base.html index.html about.html contact.html gallery.html testimonials.html
) do (
    IF NOT EXIST %%f echo.>%%f
))

REM Create subdirectories and files
for %%d in (
    partials academics admissions news events student-life legal support errors
) do (
    IF NOT EXIST %%d mkdir %%d
)

REM Create partials files
cd partials
(for %%f in (
    header.html footer.html navigation.html announcements.html
) do (
    IF NOT EXIST %%f echo.>%%f
))
cd ..

REM Create academics files
cd academics
(for %%f in (
    programs.html faculties.html departments.html research.html
) do (
    IF NOT EXIST %%f echo.>%%f
))
cd ..

REM Create admissions files
cd admissions
(for %%f in (
    index.html requirements.html apply.html
) do (
    IF NOT EXIST %%f echo.>%%f
))
cd ..

REM Create news files
cd news
(for %%f in (
    index.html [slug].html
) do (
    IF NOT EXIST %%f echo.>%%f
))
cd ..

REM Create events files
cd events
(for %%f in (
    index.html [slug].html
) do (
    IF NOT EXIST %%f echo.>%%f
))
cd ..

REM Create student-life files
cd student-life
(for %%f in (
    index.html housing.html clubs.html sports.html
) do (
    IF NOT EXIST %%f echo.>%%f
))
cd ..

REM Create legal files
cd legal
(for %%f in (
    privacy.html terms.html sitemap.html
) do (
    IF NOT EXIST %%f echo.>%%f
))
cd ..

REM Create support files
cd support
(for %%f in (
    donate.html careers.html
) do (
    IF NOT EXIST %%f echo.>%%f
))
cd ..

REM Create error files
cd errors
(for %%f in (
    404.html 500.html
) do (
    IF NOT EXIST %%f echo.>%%f
))
cd ..

echo Folder structure created successfully.
