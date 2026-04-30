<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { db } from '../db/index.js'

const route = useRoute()
const router = useRouter()

// 1. Reactive variables for the form
const title = ref('')
const date = ref('')
const time = ref('')
const type = ref('')
const placeName = ref('')
const placeAddress = ref('')

// 2. Variables to hold our database keys (CRITICAL FOR EDITING)
const documentId = ref('')
const documentRev = ref('')

// 3. Fetch the existing activity and fill the form
const loadActivityForEditing = () => {
  const id = route.params.id 
  
  db.get(id)
    .then((doc) => {
      // Save the keys we need for the update later
      documentId.value = doc._id
      documentRev.value = doc._rev

      // Pre-fill the form inputs with the existing data
      title.value = doc.title
      date.value = doc.date
      time.value = doc.time
      type.value = doc.type
      
      // Check if place exists to avoid errors, then pre-fill
      if (doc.place && doc.place.length > 0) {
        placeName.value = doc.place[0].name
        placeAddress.value = doc.place[0].address
      }
    })
    .catch((error) => {
      console.error('Error loading activity for edit:', error)
    })
}

// 4. Save the updated activity
const updateActivity = () => {
  // Rebuild the exact same object structure, but include _id AND _rev
  const updatedActivity = {
    _id: documentId.value,   // Keeps the original ID
    _rev: documentRev.value, // PROVES we are allowed to overwrite it
    title: title.value,
    date: date.value,
    time: time.value,
    type: type.value,
    place: [
      { 
        name: placeName.value, 
        address: placeAddress.value 
      }
    ]
  }

  // db.put() acts as "update" when you include the _rev
  db.put(updatedActivity)
    .then(() => {
      console.log('Activity updated successfully!')
      // Send the user back to the Home dashboard
      router.push('/')
    })
    .catch((error) => {
      console.error('Error updating activity (Conflict?):', error)
    })
}

// Load the data into the form the moment the view opens
onMounted(() => {
  loadActivityForEditing()
})


</script>

<template>
  <div class="edit-view">
    <header class="top-header">
      <h1>Edit Activity</h1>
      <RouterLink to="/" class="cancel-btn">Cancel</RouterLink>
    </header>

    <div class="form-container">
      <!-- CRITICAL: This now calls the updateActivity function we just wrote -->
      <form @submit.prevent="updateActivity">
        
        <!-- Basic Info -->
        <div class="form-group">
          <label>Activity Title</label>
          <input v-model="title" type="text" required />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Date</label>
            <input v-model="date" type="date" required />
          </div>
          <div class="form-group">
            <label>Time</label>
            <input v-model="time" type="time" required />
          </div>
        </div>

        <div class="form-group">
          <label>Category</label>
          <select v-model="type">
            <option value="university">University</option>
            <option value="work">Work</option>
            <option value="music">Music</option>
          </select>
        </div>

        <!-- Location Info -->
        <fieldset class="location-box">
          <legend>Location Details</legend>
          <div class="form-group">
            <label>Place Name</label>
            <input v-model="placeName" type="text" required />
          </div>
          <div class="form-group">
            <label>Exact Address</label>
            <input v-model="placeAddress" type="text" />
          </div>
        </fieldset>

        <button type="submit" class="save-btn">Update Activity</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.edit-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
  color: #2c3e50;
}

.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #42b983;
  padding: 15px 30px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.top-header h1 { margin: 0; font-size: 1.8rem; }

.cancel-btn {
  color: #e74c3c;
  text-decoration: none;
  font-weight: bold;
}

.form-container {
  border: 2px solid #42b983;
  padding: 30px;
  border-radius: 8px;
  background-color: #f9fdfa;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1; 
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 0.95rem;
}

input, select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus, select:focus {
  outline: none;
  border-color: #42b983;
}

.location-box {
  border: 1px solid #42b983;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.location-box legend {
  font-weight: bold;
  color: #42b983;
  padding: 0 5px;
}

.save-btn {
  width: 100%;
  background: #42b983;
  color: white;
  border: none;
  padding: 15px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.save-btn:hover {
  background: #369f6e;
}
</style>