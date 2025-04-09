<template>
  <div class="login-container">
    <div class="content-center">

      <div class="alert-wrapper">
        <AlertDanger v-if="errorMessage" :message="errorMessage"/>
        <AlertSuccess v-if="successMessage" :message="successMessage"/>
      </div>

      <div class="login-form-wrapper">
        <div class="inner-title-wrapper">
          <h2 class="inner-title">Sign In</h2>
        </div>

        <div class="input-group">
          <label for="firstName">First Name</label>
          <input
              id="firstName"
              type="text"
              v-model="firstName"
              placeholder="First name"
              class="form-input"
          />
        </div>

        <div class="input-group">
          <label for="lastName">Last Name</label>
          <input
              id="lastName"
              type="text"
              v-model="lastName"
              placeholder="Last name"
              class="form-input"
          />
        </div>

        <button @click="handleLogin" class="login-btn">Log in</button>

        <p class="register-prompt">
          Don't have an account?
          <router-link to="/register" class="register-link">Sign up</router-link>
        </p>
      </div>
    </div>

    <div class="bottom-nav">
      <router-link to="/" class="bottom-nav-link">Home</router-link>
      <span class="divider">|</span>
      <router-link to="/planets" class="bottom-nav-link">Routes</router-link>

      <template v-if="isLoggedIn()">
        <span class="divider">|</span>
        <button @click="handleLogout" class="bottom-nav-link logout-btn">Logout</button>
      </template>

    </div>
  </div>
</template>


<script>
import NavigationService from "@/services/NavigationService";
import AlertSuccess from "@/components/alerts/AlertSuccess.vue";
import AlertDanger from "@/components/alerts/AlertDanger.vue";
import CustomerService from "@/services/CustomerService";

export default {
  name: "LoginView",
  components: {
    AlertSuccess,
    AlertDanger
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      errorMessage: '',
      successMessage: '',
      alertTimeout: null
    };
  },
  methods: {
    isLoggedIn() {
      return sessionStorage.getItem('firstName') !== null &&
          sessionStorage.getItem('lastName') !== null;
    },

    handleLogin() {
      this.clearAlerts();

      if (!this.firstName || !this.lastName) {
        this.errorMessage = "Please fill in all the fields";
        this.startAlertTimer();
        return;
      }

      CustomerService.sendLoginRequest(this.firstName, this.lastName)
          .then(() => {
            sessionStorage.setItem('firstName', this.firstName);
            sessionStorage.setItem('lastName', this.lastName);

            this.successMessage = "Login successful!";
            this.startAlertTimer();

            setTimeout(() => {
              this.clearAlerts();
              NavigationService.navigateToPlanetsView();
            }, 2000);
          })
          .catch(() => {
            this.errorMessage = "Login failed. Please check your credentials";
            this.startAlertTimer();
          });
    },

    handleLogout() {
      sessionStorage.removeItem('firstName');
      sessionStorage.removeItem('lastName');
      this.firstName = '';
      this.lastName = '';
      this.successMessage = "Logged out successfully!";
      this.startAlertTimer();
    },

    startAlertTimer() {
      this.alertTimeout = setTimeout(() => {
        this.clearAlerts();
      }, 2000);
    },

    clearAlerts() {
      this.errorMessage = '';
      this.successMessage = '';
      if (this.alertTimeout) clearTimeout(this.alertTimeout);
    }
  },
  mounted() {
    if (this.isLoggedIn()) {
      this.firstName = sessionStorage.getItem('firstName');
      this.lastName = sessionStorage.getItem('lastName');
    }
  }
};
</script>

<style scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #0f517c, #001c3c);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

.login-form-wrapper {
  width: 90%;
  max-width: 400px;
  padding: 2rem;
  background-color: rgba(207, 196, 171, 0.7);
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(207, 196, 171, 0.3);
  border: 1px solid rgba(207, 196, 171, 0.8);
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #001c3c;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
}

.form-input {
  width: 100%;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 28, 60, 0.3);
  border-radius: 6px;
  color: #001c3c;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #00e5ff;
  box-shadow: 0 0 0 2px rgba(0, 229, 255, 0.3);
}

.inner-title-wrapper {
  text-align: center;
  margin-bottom: 1.5rem;
}

.inner-title {
  color: #00e5ff;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 15px #00e5ff, 0 0 25px #00e5ff;
  font-family: 'Arial', sans-serif;
  font-size: 1.5rem;
}

.login-btn {
  width: 100%;
  background-color: #00e5ff;
  color: #001c3c;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1rem;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  margin-bottom: 1rem;
}

.login-btn:hover {
  background-color: #e6dcc0;
  color: #000;
}

.register-prompt {
  text-align: center;
  color: #001c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.register-link {
  color: #00518a;
  font-weight: 600;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #001c3c;
}

.bottom-nav {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.bottom-nav-link {
  color: #cfc4ab;
  text-decoration: none;
  margin: 0 15px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9), 0 0 10px rgba(207, 196, 171, 0.5);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: 600;
}

.divider {
  color: #cfc4ab;
  opacity: 0.8;
}

.logout-btn {
  background: none;
  border: none;
  color: #cfc4ab;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  padding: 0;
  text-decoration: underline;
}

.alert-wrapper {
  max-width: 400px;
  width: 90%;
  margin-bottom: 1rem;
}

.alert-success,
.alert-danger {
  max-width: 400px;
  width: 90%;
  margin-bottom: 1rem;
  word-break: break-word;
  white-space: normal;
}
</style>
