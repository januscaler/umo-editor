import App from './app.vue'
import {useUmoEditor} from 'dist/umo-editor'
const app = createApp(App)
app.use(useUmoEditor,{})

app.mount('#app')
