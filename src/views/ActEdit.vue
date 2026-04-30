<script setup>

</script>

<template>
<div class="add-view">
    <header class="top-header">
      <h1>Create New Activity</h1>
      <RouterLink to="/" class="cancel-btn">Cancel</RouterLink>
    </header>

    <div class="form-container">
      <form @submit.prevent="saveActivity">
        
        <div class="form-group">
          <label>Activity Title</label>
          <input v-model="activity.title" type="text" required />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Date</label>
            <input v-model="activity.date" type="date" required />
          </div>
          <div class="form-group">
            <label>Time</label>
            <input v-model="activity.time" type="time" required />
          </div>
        </div>

        <div class="form-group">
          <label>Category</label>
          <select v-model="activity.type">
            <option value="university">University</option>
            <option value="work">Work</option>
            <option value="music">Music</option>
          </select>
        </div>

        <fieldset class="location-box">
          <legend>Location Details</legend>
          <div class="form-group">
            <label>Place Name</label>
            <input v-model="activity.placeName" type="text" required />
          </div>
          <div class="form-group">
            <label>Exact Address</label>
            <input v-model="activity.placeAddress" type="text" placeholder="Street name and number" />
          </div>
        </fieldset>

        <button type="submit" class="save-btn">Save Activity</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
	.add-view {
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
  flex: 1; /* Makes Date and Time inputs sit side-by-side evenly */
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