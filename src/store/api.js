import axios from "axios";

export default {
  abort: {
    cleanup: () => console.log("api abort")
  },
  user: {
    login: credentials =>
      axios.post("/auth/", { credentials }).then(res => res.data.user),
    signUp: user => axios.put("/people", { user }).then(res => res.data.user),
    confirm: token => axios.put("/auth/confirmation", { token }),
    resetPasswordRequest: email =>
      axios.post("/auth/reset_password_request", { email }),
    validateToken: token => axios.post("/auth/validate_token", { token }),
    resetPassword: data => axios.put("/auth/reset_password", { data }),
    generateConfirmToken: user =>
      axios.post("/people/generate_confirm_token", { user })
  },
  activities: {
    fectUserActivities: data =>
      axios.post("/month/", { data }).then(res => res),
    fetchActivity: activityId =>
      axios.get(`/activitiesForWeek/edit/${activityId}`).then(res => res)
  },
  staff: {
    fetchCompanyStaff: companyId =>
      axios.get(`/companyStaff/${companyId}`).then(res => res)
  }
};
