import DefaultTheme from 'vitepress/theme'
import ContactForm from './ContactForm.vue'
import "./custom.css"  // Import your CSS here
import "./style.css"  // Import your CSS here
import "./stylecont.css"  // Import your CSS here


export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ContactForm', ContactForm)
  }
}
