# bulma-a11y

[![npm (scoped)](https://img.shields.io/npm/v/@cityssm/bulma-a11y)](https://www.npmjs.com/package/@cityssm/bulma-a11y) [![Codacy grade](https://img.shields.io/codacy/grade/873a7db52d1c4a7da285a96343134e3e)](https://app.codacy.com/gh/cityssm/bulma-a11y/dashboard) [![AppVeyor](https://img.shields.io/appveyor/build/dangowans/bulma-a11y?label=lighthouse)](https://ci.appveyor.com/project/dangowans/bulma-a11y) [![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/cityssm/bulma-a11y)](https://app.snyk.io/org/cityssm/project/bf65d71f-8d8b-43ba-8262-29a3c92872ef)

The [Bulma CSS framework](https://bulma.io/)
with increased colour contrast to meet accessibility requirements.

![Sample Buttons](docs/buttons.png)

## Usage

Rather than linking to `bulma.min.css` in your webpage,
link to `bulma-a11y.min.css`.

```html
<link rel="stylesheet" href="path/to/bulma-a11y.min.css" />
```

## Test Pages

The following pages have minimal styling.
They use code samples from the official Bulma website to test for sufficient colour contrast.

- [Buttons](https://cityssm.github.io/bulma-a11y/test/server/html/buttons.html)
- [Messages](https://cityssm.github.io/bulma-a11y/test/server/html/messages.html)
- [Notifications](https://cityssm.github.io/bulma-a11y/test/server/html/notifications.html)
- [Tags](https://cityssm.github.io/bulma-a11y/test/server/html/tags.html)

## Important Note

While bulma-a11y attempts to improve colour contrast of the main Bulma components,
using bulma-a11y does not guarantee your website will be considered accessible.
