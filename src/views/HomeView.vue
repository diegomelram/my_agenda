<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../db/index.js' // Importing your database connection

// 1. The Reactive State
// This array will hold all the documents we pull from PouchDB.
// Because it's a 'ref', the HTML will automatically update when this fills with data.
const activities = ref([])

// 2. The Fetch Logic
const loadActivities = async () => {
  try {
    // We ask PouchDB for all documents. 
    // include_docs: true is REQUIRED, otherwise it only gives us the _ids!
    const result = await db.allDocs({ include_docs: true })
    
    // PouchDB wraps your data in a 'rows' array. Your actual object is inside 'doc'.
    // We use the JavaScript .map() method to extract just the data we care about.
    activities.value = result.rows.map(row => row.doc)
    
    console.log("Successfully loaded activities:", activities.value)
  } catch (error) {
    console.error("Error fetching activities from PouchDB:", error)
  }
}

// 3. The Lifecycle Hook
// onMounted runs exactly once, right as the HomeView appears on the screen.
onMounted(() => {
  loadActivities()
})
</script>

<template>
  <div class="home-view">
    
    <header class="top-header">
      <h1>Diego's Agenda</h1>
      <RouterLink to="ActAdd" class="new-btn">New activity</RouterLink>
    </header>

    <div class="layout-container">
      
      <aside class="sidebar">
        <button class="filter-btn uni">University</button>
        <button class="filter-btn work">Work</button>
        <button class="filter-btn music">Music</button>
      </aside>

      <main class="content-area">
        <h2>All activities</h2>
        
        <div class="activities-grid">
          
          <div class="activity-card" v-for="activity in activities" :key='activity._id'>
            <h3>{{ activity.title }}</h3>
            <p class="date-time">{{ activity.date }} | {{ activity.time }}</p>
            <p class="location" v-if="activity.place && activity.place.length > 0">
              {{ activity.place[0].name }} 
              <br> 
              <small>{{ activity.place[0].address }}</small>
            </p>
            <RouterLink :to="'/ActView/'+activity._id" ><button>All details</button></RouterLink>
            <RouterLink :to="'/ActEdit/'+activity._id"><button>Edit</button></RouterLink>
          </div>

         
          
        </div>
      </main>

    </div>
  </div>
</template>


<style scoped>
/* Base View Styles */
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
  color: #2c3e50;
}

/* Header (Flexbox to push items to opposite sides) */
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #42b983; /* Green border like your marker */
  padding: 15px 30px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.top-header h1 {
  margin: 0;
  font-size: 2rem;
}

.new-btn {
  background: white;
  border: 2px solid #42b983;
  color: #42b983;
  padding: 10px 20px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 4px;
  transition: all 0.2s;
}

.new-btn:hover {
  background: #42b983;
  color: white;
}

/* Layout Container */
.layout-container {
  display: flex;
  gap: 20px;
}

/* Sidebar */
.sidebar {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 2px solid #42b983;
  padding: 20px;
  border-radius: 8px;
}

.filter-btn {
  background: white;
  border: 2px solid #42b983;
  padding: 15px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
}

/* Main Area */
.content-area {
  flex: 1;
  border: 2px solid #42b983;
  padding: 20px;
  border-radius: 8px;
}

.content-area h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

/* The CSS Grid (Matches your drawing perfectly) */
.activities-grid {
  display: grid;
  /* Creates auto-fitting columns that are at least 150px wide */
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
}

.activity-card {
  border: 2px solid #42b983;
  min-height: 120px;
  padding: 15px;
  border-radius: 4px;
  background-color: #f9fdfa;
}

.activity-card h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
}

.date-time {
  font-size: 0.9rem;
  color: #555;
  margin: 0 0 5px 0;
}

.location {
  font-size: 0.85rem;
  font-style: italic;
  margin: 0;
}
</style>