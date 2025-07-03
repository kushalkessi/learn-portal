<template>
  <form @submit.prevent="handleSubmit" class="contact-form">
    <h2 class="contact-title">Connect to Us</h2>

    <label>Your full name <span class="required">*</span></label>
    <input v-model="name" type="text" placeholder="Enter your full name" required />

    <label>Your email address <span class="required">*</span></label>
    <input v-model="email" type="email" placeholder="Enter your email" required />

    <label>Primary mobile number <span class="required">*</span></label>
    <input v-model="mobile" type="text" placeholder="" required />

    <label>Secondary mobile number</label>
    <input v-model="mobile1" type="text" placeholder="" />

    <label>Your address <span class="required">*</span></label>
    <input v-model="address" type="text" placeholder="" required />

    <label>Designation <span class="required">*</span></label>
    <input v-model="designation" type="text" placeholder="" required />

    <label>Organization <span class="required">*</span></label>
    <input v-model="organization" type="text" placeholder="" required />

    <label>What would you like to learn? <span class="required">*</span></label>
    <input v-model="learn" type="text" placeholder="" rows="2" required />

    <label>Upload your photo </label>
    <input type="file" @change="handleFileChange" accept="image/*" ref="fileInput" />
    
    <!-- Image preview -->
    <div v-if="previewUrl" class="preview-container">
      <img :src="previewUrl" alt="Photo preview" class="preview-image" />
    </div>

    <label>Your message to us <span class="required"></span></label>
    <textarea v-model="message" placeholder="" rows="4" required></textarea>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Submitting...' : 'Push Contact' }}
    </button>

    <p v-if="success" class="success">✅ Push contact successfully!</p>
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
const photoFile = ref(null)
const previewUrl = ref('')
const fileInput = ref(null)

const loading = ref(false)
const success = ref(false)
const error = ref('')

function handleFileChange(event) {
  const file = event.target.files[0]
  photoFile.value = file

  if (!file) {
    previewUrl.value = ''
    return
  }

  // Create a local preview URL for the selected image
  previewUrl.value = URL.createObjectURL(file)
}

async function handleSubmit() {
  loading.value = true
  error.value = ''
  success.value = false

  let photoUrl = ''

  // Upload image if selected
  if (photoFile.value) {
    const fileName = `${Date.now()}-${photoFile.value.name}`
    const { data, error: uploadError } = await supabase.storage
      .from('contactimage')
      .upload(fileName, photoFile.value)

    if (uploadError) {
      error.value = 'Image upload failed: ' + uploadError.message
      loading.value = false
      return
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('contactimage')
      .getPublicUrl(fileName)

    photoUrl = publicUrlData.publicUrl
  }

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
      message: message.value,
      photo: photoUrl || null
    }
  ])

  if (insertError) {
    error.value = insertError.message
  } else {
    success.value = true
    // Reset all fields
    name.value = ''
    email.value = ''
    mobile.value = ''
    mobile1.value = ''
    address.value = ''
    designation.value = ''
    organization.value = ''
    learn.value = ''
    message.value = ''
    photoFile.value = null
    previewUrl.value = ''

    // Reset the file input element so it clears visually
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }

  loading.value = false
}
</script>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: auto;
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
  color: #444;
}

.required {
  color: red;
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
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.contact-form button:hover:not(:disabled) {
  background-color: #005a9e;
  transform: scale(1.05);
}

.contact-form button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
  transform: none;
}

.contact-title {
  position: relative;
  display: inline-block;
  font-weight: bold;
  color: #0078d4;
  margin-bottom: 0.25rem;
}

.contact-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 3px;
  background-color: #0078d4;
  border-radius: 2px;
}

.contact-title:hover {
  transform: scale(1.1);
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

.preview-container {
  margin-top: 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.preview-image:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 120, 212, 0.5);
}

.preview-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  object-fit: contain;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>
