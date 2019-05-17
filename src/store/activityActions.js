export const activitiesInitialState = {
  editActivity: { dates: [] }
};

export const activityActions = {
  getEditActivity: payload => {
    localStorage.editActivity = payload;
    console.log(JSON.stringify(localStorage.getItem("editActivity")));
    return { editActivity: payload };
  }
};
