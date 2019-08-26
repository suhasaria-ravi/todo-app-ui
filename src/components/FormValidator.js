/* For Form Validation:
The name check for less than 1 or 3 chars not done for front end code
this is done to show back end error handling, try name with no chars to check backend error handling */

export const formValidMethod = currentState => {
  const currentstate = {
    id: currentState.id,
    name: currentState.name,
    description: currentState.description,
    dueDate: currentState.dueDate
  };

  let formErrors = "\n";

  for (const [name, value] of Object.entries(currentstate)) {

    switch (name) {      
      case "name": formErrors += value.length > 16 ? "Max 16 char allowed for Name\n" : ""        
        break;
      case "description": formErrors += value.length < 3 ? "Min 3 char required for Description\n" : ""        
        break;
      case "dueDate":
        if (value == null) {
          formErrors += "Value for Due Date not provided \n";
        }
        else if ((value != null) && (value.length < 1)) {
          formErrors += "Value for Due Date not provided \n";
        }
        break;
      case "id":
        break;
      default:
        break;
    }
  }
  return formErrors;
}


export const formValidMethodWithName = (value, currentName) => {

  let formErrors = "\n";

  switch (currentName) {    
    case "name": formErrors += value.length > 16 ? "Max 16 char allowed for Name\n" : ""
      break;
    case "description": formErrors += value.length < 3 ? "Min 3 char required for Description\n" : ""
      break;
    case "dueDate":
      if (value == null) {
        formErrors += "Value for Due Date not provided \n";
      }
      else if ((value != null) && (value.length < 1)) {
        formErrors += "Value for Due Date not provided \n";
      }
      break;
    case "id":
      break;
    default:
      break;
  }

  return formErrors;
}