<template>
  <div class="register-container">
    <div class="content-center">
      <div class="login-form-wrapper">

        <AlertDanger :message="errorMessage"/>
        <AlertSuccess :message="successMessage"/>

        <div class="inner-title-wrapper">
          <h2 class="inner-title">Create Account</h2>
        </div>

        <div class="input-group">
          <label for="firstName">First Name</label>
          <input
              id="firstName"
              type="text"
              v-model="customerDto.firstName"
              placeholder="First name"
              class="form-input"
          />
        </div>

        <div class="input-group">
          <label for="lastName">Last Name</label>
          <input
              id="lastName"
              type="text"
              v-model="customerDto.lastName"
              placeholder="Last name"
              class="form-input"
          />
        </div>

        <button @click="handleRegister" class="login-btn">
          Register
        </button>

        <p class="register-prompt">
          Already have an account?
          <router-link to="/login" class="register-link">Sign in</router-link>
        </p>
      </div>
    </div>

    <div class="bottom-nav">
      <router-link to="/" class="bottom-nav-link">Home</router-link>
      <span class="divider">|</span>
      <router-link to="/routes" class="bottom-nav-link">Routes</router-link>
    </div>
  </div>
</template>

<script>
import NavigationService from "@/services/NavigationService";
import CustomerService from "@/services/CustomerService";
import AlertSuccess from "@/components/alerts/AlertSuccess.vue";
import AlertDanger from "@/components/alerts/AlertDanger.vue";

export default {
  name: "RegisterView",
  components: {
    AlertSuccess,
    AlertDanger
  },
  data() {
    return {
      customerDto: {
        firstName: '',
        lastName: ''
      },
      successMessage: '',
      errorMessage: '',
      alertTimeout: null
    };
  },
  methods: {
    handleRegister() {
      this.clearAlerts();

      if (!this.customerDto.firstName || !this.customerDto.lastName) {
        this.errorMessage = "Please fill in all fields";
        this.startAlertTimer();
        return;
      }

      CustomerService.sendPostCustomerRequest(this.customerDto)
          .then(() => {
            this.successMessage = "Registration successful!";
            this.customerDto.firstName = '';
            this.customerDto.lastName = '';

            setTimeout(() => {
              this.successMessage = '';
              NavigationService.navigateToLoginView();
            }, 2000);
          })
          .catch(error => {
            console.error("Registration failed:", error);
            this.errorMessage =
                error.response?.data || "Registration failed. Try again.";
            this.startAlertTimer();
          });
    },

    clearAlerts() {
      this.errorMessage = '';
      this.successMessage = '';
      if (this.alertTimeout) clearTimeout(this.alertTimeout);
    },

    startAlertTimer() {
      this.alertTimeout = setTimeout(() => {
        this.clearAlerts();
      }, 5000);
    },
  }
};
</script>

<style scoped>

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.register-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #0f517c, #001c3c);
  display: flex;
  flex-direction: column;
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
}

.content-center {
  position: relative;
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
  position: fixed;
  top: 215px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
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

.form-input::placeholder {
  color: rgba(0, 28, 60, 0.4);
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
  text-align: center;
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

@media (max-width: 768px) {
  .login-form-wrapper {
    width: 95%;
    padding: 1.5rem;
  }

  .inner-title {
    font-size: 1.3rem;
    letter-spacing: 0.3rem;
  }
}
</style>