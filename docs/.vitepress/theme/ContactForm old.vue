<template>
  <form @submit.prevent="handleSubmit" class="contact-form">
    <h2>📬 Contact Us</h2>

    <label>Your full name <span class="required">*</span></label>
    <input v-model="name" type="text" placeholder="👤 Enter your full name" required />

    <label>Your email address <span class="required">*</span></label>
    <input v-model="email" type="email" placeholder="📧 Enter your email" required />

    <label>Primary mobile number <span class="required">*</span></label>
    <input v-model="mobile" type="text" placeholder="📱 e.g. 9800000000" required />

    <label>Secondary mobile number (optional)</label>
    <input v-model="mobile1" type="text" placeholder="📞 e.g. 9810000000" />

    <label>Your address <span class="required">*</span></label>
    <input v-model="address" type="text" placeholder="🏠 e.g. Kathmandu, Nepal" required />

    <label>Your designation <span class="required">*</span></label>
    <input v-model="designation" type="text" placeholder="💼 e.g. Student / Researcher" required />

    <label>Organization <span class="required">*</span></label>
    <input v-model="organization" type="text" placeholder="🏢 e.g. Antarikchya Pratisthan Nepal" required />

    <label>What would you like to learn? <span class="required">*</span></label>
    <input v-model="learn" type="text" placeholder="📚 e.g. Google Earth Engine, Python" required />

    <label>Your message or feedback <span class="required">*</span></label>
    <textarea v-model="message" placeholder="✉️ Let us know how we can help..." rows="4" required></textarea>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Submitting...' : 'Send Message' }}
    </button>

    <p v-if="success" class="success">✅ Message sent successfully!</p>
    <p v-if="error" class="error">❌ {{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from './supabase.js'

const name = ref('')
const email = ref('')
const mobile = ref('')
const mobile1 = ref('')
const address = ref('')
const designation = ref('')
const organization = ref('')
const learn = ref('')
const message = ref('')

const loading = ref(false)
const success = ref(false)
const error = ref('')

async function handleSubmit() {
  loading.value = true
  error.value = ''
  success.value = false

  const { error: insertError } = await supabase.from('Contact').insert([
    {
      name: name.value,
      email: email.value,
      mobile: mobile.value,
      mobile1: mobile1.value,
      address: address.value,
      designation: designation.value,
      organization: organization.value,
      learn: learn.value,
      message: message.value
    }
  ])

  if (insertError) {
    error.value = insertError.message
  } else {
    success.value = true
    name.value = ''
    email.value = ''
    mobile.value = ''
    mobile1.value = ''
    address.value = ''
    designation.value = ''
    organization.value = ''
    learn.value = ''
    message.value = ''
  }

  loading.value = false
}
</script>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
  background: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Segoe UI', sans-serif;
}

.contact-form h2 {
  text-align: center;
  color: #0078d4;
}

.contact-form label {
  font-weight: bold;
  margin-bottom: 4px;
  color: #444;
}

.required {
  color: red;
  margin-left: 3px;
}

.contact-form input,
.contact-form textarea {
  padding: 10px;
  font-size: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
}

.contact-form button {
  background-color: #0078d4;
  color: white;
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.contact-form button:disabled {
  background-color: #aaa;
}

.success {
  color: green;
  text-align: center;
  font-weight: bold;
}

.error {
  color: red;
  text-align: center;
  font-weight: bold;
}
</style>
