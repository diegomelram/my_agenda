<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router' // Importing your database connection
import { db } from '../db/index.js' // Importing your database connection

const activity=ref({})

const route = useRoute()
const router = useRouter()


const loadActivity = () =>{
const activity_id = route.params.id


db.get(activity_id).then((result)=>{
	activity.value=result
})
.catch((error)=>{
	console.error('Error loading activity: ',error)
})
}

const deleteActivity = () => {
	const isSure= confirm('Are you sure you want to delete this activity?')
	if (isSure){
  db.remove(activity.value)
    .then(() => {
      console.log('Activity deleted!')
      // Navigate ONLY after the successful deletion
      router.push('/')
    })
    .catch((error) => {
      console.error('Error deleting activity:', error)
    })
  } else {
  	console.log('You are still here')
  }
}

// Run the fetch function as soon as the page loads
onMounted(() => {
  loadActivity()
})

</script>

<template>

	<div class="view-page">
    
    <header class="top-header">
      <h1>Activity Details</h1>
      <div class="header-actions">
        <RouterLink to="/" class="back-btn">Back to Agenda</RouterLink>
      </div>
    </header>

    <!-- Only show this block IF the data has successfully loaded -->
    <div class="details-container" v-if="activity">
      
      <div class="title-section">
        <h2>{{ activity.title }}</h2>
        <!-- A dynamic badge based on the type (university, work, music) -->
        <span class="badge">{{ activity.type }}</span>
      </div>

      <div class="info-grid">
        <div class="info-block">
          <strong>Date</strong>
          <p>{{ activity.date }}</p>
        </div>
        <div class="info-block">
          <strong>Time</strong>
          <p>{{ activity.time }}</p>
        </div>
      </div>

      <!-- We loop through the 'place' array just in case there are multiple locations! -->
      <div class="location-section" v-if="activity.place && activity.place.length > 0">
        <h3>Locations</h3>
        <div 
          v-for="(loc, index) in activity.place" 
          :key="index" 
          class="location-card"
        >
          <strong>{{ loc.name }}</strong>
          <p>{{ loc.address }}</p>
        </div>
      </div>

      <!-- The Delete Button -->
      <div class="danger-zone">
        <button @click="deleteActivity" class="delete-btn">Delete Activity</button>
      </div>

    </div>
    
    <!-- Show a loading message while PouchDB searches -->
    <div v-else class="loading-state">
      <p>Loading details...</p>
    </div>

  </div>



</template>

<style scoped>
	.view-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
  color: #2c3e50;
}

/* Header */
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

.back-btn {
  background: white;
  border: 2px solid #42b983;
  color: #42b983;
  padding: 8px 16px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 4px;
  transition: all 0.2s;
}

.back-btn:hover { background: #42b983; color: white; }

/* Main Container */
.details-container {
  border: 2px solid #42b983;
  padding: 30px;
  border-radius: 8px;
  background-color: #f9fdfa;
}

/* Title and Badge */
.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.title-section h2 { margin: 0; font-size: 2rem; }

.badge {
  background-color: #42b983;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: capitalize;
}

/* Info Grid */
.info-grid {
  display: flex;
  gap: 30px;
  margin-bottom: 25px;
}

.info-block strong { color: #888; font-size: 0.9rem; text-transform: uppercase; }
.info-block p { margin: 5px 0 0 0; font-size: 1.2rem; font-weight: bold; }

/* Locations */
.location-section h3 { margin-bottom: 10px; color: #42b983; }

.location-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 4px;
  background: white;
  margin-bottom: 10px;
}

.location-card strong { font-size: 1.1rem; }
.location-card p { margin: 5px 0 0 0; color: #555; }

/* Danger Zone */
.danger-zone {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #eaeaea;
  text-align: right;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover { background-color: #c0392b; }

.loading-state { text-align: center; padding: 50px; font-size: 1.2rem; color: #888; }
</style>