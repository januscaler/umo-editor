<p style="text-align: center; margin: 2rem 0;">
<a href="https://umodoc.com" target="_blank"><img src="https://unpkg.com/@umoteam/editor-external@latest/static/logo.svg" alt="umodoc.com" width="280" /></a>
</p>

<p style={{ textAlign: 'center' }}>
<a href="https://github.com/umodoc/editor/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/npm/l/@januscaler/umoeditor" /></a>
<a href="https://www.npmjs.com/package/@januscaler/umoeditor" target="_blank"><img src="https://img.shields.io/npm/v/@januscaler/umoeditor" /></a>
<a href="https://www.npmjs.com/package/@januscaler/umoeditor" target="_blank"><img src="https://img.shields.io/npm/d18m/@januscaler/umoeditor" /></a>
<a href="https://www.npmjs.com/package/@januscaler/umoeditor" target="_blank"><img src="https://img.shields.io/npm/unpacked-size/%40umoteam%2Feditor" /></a>
<a href="https://github.com/umodoc/editor/commits" target="_blank"><img src="https://img.shields.io/github/commit-activity/m/umodoc/editor" /></a>
</p>

> Please Note  
> This is a forked version of the official UMO editor. We initially tried using the official version for our apps but faced issues with setting English as the default language. To resolve this, we explicitly set the default language to English.

# Introduction

Umo Editor is open-source document editor based on Vue3 and Tiptap. Umo Editor provides comprehensive document editing capabilities and AI creation features, supports pagination, supports Markdown syntax, offers basic rich text editing functions, allows for the insertion of various node types in multiple formats, provides a variety of practical tools, and supports setting page styles. It also supports exporting in various formats, printing and print preview, block-level document editing, adding custom extensions, multi-language settings, and a dark theme.

<img src="https://unpkg.com/@umoteam/editor-external@latest/static/umo-editor-en@2x.png" alt="umo editor" />

As a standalone Vue3 plugin, Umo Editor can be easily integrated into any Vue3 project with zero configuration. For non-Vue3 projects, you can embed Umo Editor using an Iframe.

[Documentation](https://editor.umodoc.com/en/docs) | [中文文档](https://editor.umodoc.com/cn/docs) | [Live Demo](https://demo.umodoc.com/editor?lang=en-US) | [GitHub](https://github.com/umodoc/editor) | [NPM](https://www.npmjs.com/package/@januscaler/umoeditor)

## Online Experience

Visit [Playground](https://demo.umodoc.com/editor?pane=hide&lang=en-US) for a fast experience.

## Documentation

Please visit [Documentation](https://editor.umodoc.com/en/docs).

## Design Philosophy

The birth of Umo Editor aims to address the complexity of document editing in web applications, providing open-source and free powerful editing capabilities and pagination modes similar to Microsoft Word for web projects, while maintaining the convenience of web applications. Whether it's government and enterprise information management systems, academic research writing, team document collaboration, knowledge base management, or personal note organization, Umo Editor can be your capable assistant.

## Open Source Advantages

- **Free to Use**: As an open-source project, Umo Editor is freely available to all developers under the [MIT License](https://github.com/umo-editor/umo-editor/blob/main/LICENSE), with no copyright concerns.

- **Continuous Updates**: Umo Editor will continue to iterate, constantly optimizing features and enhancing user experience.

- **Customizable Development**: Open source means greater flexibility. Developers can customize the development according to project needs to create a unique document editor.

## Core Features

- Zero-config out-of-the-box usability
- Pagination mode similar to that in Microsoft Word
- Lightweight
- WYSIWYG (What You See Is What You Get) throughout the process
- Rich-text editing capabilities
- Markdown syntax support
- Integrated practical tools
- Presentation mode
- Document export and sharing
- Page settings
- AI assistant
- Support for printing and print preview
- Support for custom plugins
- Shortcut key support
- Theme customization
- Multi-language settings
- Dark mode support

For more detailed introductions, see [Core Features](./docs/features).

## Browser Support

| Browser                | Version | Support |
| ---------------------- | ------- | :-----: |
| Google Chrome          | Latest  |   ✅    |
| Firefox                | Latest  |   ✅    |
| Safari                 | Latest  |   ✅    |
| Microsoft Edge         | Latest  |   ✅    |
| Internet Explorer (IE) | All     |   ❌    |

## Node.js Version Support

Node.js 18.0.0 or above.

## Quick Start for Setting Up UMO Editor in a Nuxt Project  

To integrate **UMO Editor** into your Nuxt project, follow these steps:

#### Step 1: Configure the Plugin  

Create a file named `umoeditor.client.ts` in the `plugins` directory and add the following code:  

```ts
import { useUmoEditor, UmoEditorOptions } from '@januscaler/umoeditor'

export default defineNuxtPlugin((app) => {
    const options = {}
    app.vueApp.use(useUmoEditor, options as unknown as UmoEditorOptions);
});
```

#### Step 2: Use the Editor in a Component  

Now, create a component named `msWord.vue` and insert the following code:  

```vue
<template>
  <div class="box">
    <umo-editor @created="onEditorCreated" ref="editorRef" v-bind="options" />
  </div>
</template>

<script setup lang="ts">
const options = ref({})
const editorRef = ref()

function onEditorCreated(editor: any) {
  options.value = {
    toolbar: {
      enableSourceEditor: true,
    },
    page: {
      showBreakMarks: false
    },
    document: {
      content: localStorage.getItem('document.content') ?? '<p>测试文档</p>',
    },
    cdnUrl: 'https://cdn.umodoc.com',
    shareUrl: 'https://umodoc.com',
    file: {
      allowedMimeTypes: [
        'application/pdf',
        'image/svg+xml',
        'video/mp4',
        'audio/*',
      ],
    },
    assistant: {
      enabled: true,
    },
    user: {
      userId: 'umoeditor',
      nickName: 'Umo Editor',
      avatarUrl: 'https://tdesign.gtimg.com/site/avatar.jpg',
    },
    async onSave(content: string, page: number, document: { content: string }) {
      localStorage.setItem('document.content', document.content)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (true) {
            console.log('onSave', { content, page, document })
            resolve('Save successful')
          } else {
            reject(new Error('Save failed'))
          }
        }, 2000)
      })
    },
    async onFileUpload(file: File & { url?: string }) {
      if (!file) throw new Error('No file found for upload')

      console.log('Uploading file:', file)
      await new Promise((resolve) => setTimeout(resolve, 3000))

      return {
        id: 7,
        url: file.url ?? URL.createObjectURL(file),
        name: file.name,
        type: file.type,
        size: file.size,
      }
    },
    async onAssistant() {
      return await Promise.resolve('<p>AI Assistant Test</p>')
    },
    async onCustomImportWordMethod() {
      return await Promise.resolve({ value: '<p>Test Word Import</p>' })
    },
  }
}
</script>

<style>
.box {
  margin: 20px;
  height: calc(100vh - 40px);
  border: 1px solid #ddd;
  box-sizing: border-box;
  position: relative;
}
</style>
```


## Join the Community

We encourage users to join the Umo Editor open-source community and participate in the development and improvement of the product. Whether submitting bug reports, feature requests, or code contributions, all are valuable parts of our community.

You can submit issues or suggestions via https://github.com/umodoc/editor/discussions.

Or submit bug reports via https://github.com/umodoc/editor/issues.

## Contributing Code

### Contributors

The development of Umo Editor could not have been possible without the support of the community. Below is the list of contributors who have contributed code to Umo Editor. We extend our thanks to them:

- [Umo Team](https://github.com/umodoc): 👨‍💻 Core developers
- [Cassielxd](https://github.com/Cassielxd): 💪 Implemented pagination and many important features for Umo Editor
- [Na'aman Hirschfeld](https://github.com/Goldziher)：💪🏻 Enhanced TypeScript support, added test cases, and provided a better foundation for the development of Umo Editor
- [ChenErik](https://github.com/ChenErik)：🛠️ Contributed code to Umo Editor
- [Sherman Xu](https://github.com/xuzhenjun130): 🛠 Contributed code to Umo Editor

We welcome all forms of contributions, including but not limited to submitting bug reports, feature requests, and code contributions.

## Contact Us

If you have any questions or suggestions, please contact us through the following methods. Before that, it is recommended to read this document carefully to understand how to use Umo Editor.

- Feedback: https://github.com/umodoc/editor/issues
- Community: https://github.com/umodoc/editor/discussions
- Email: [contact@umoteam.com](mailto:contact@umoteam.com)

## Support Us

If you find Umo Editor useful, please consider supporting us in the following ways:

- ⭐ Star the [Umo Editor Repository](https://github.com/umodoc/editor) to show your support for the project.
- 🔗 If you use Umo Editor in your project, please add a link to https://github.com/umodoc/editor.

## License

Umo Editor is licensed under the [MIT License](https://github.com/umodoc/editor/blob/main/LICENSE), allowing you to use, modify, and distribute the software freely.
