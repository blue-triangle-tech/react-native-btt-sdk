// BTTCustomVariable.js
import BttSdk from './BttSdk';

class BTTCustomVariable {

   /**
   * Sets a custom variable with the specified name and value.
   * @param name - The name of the custom variable to set.
   * @param value - The value to associate with the variable.
   */
  static setCustomVariable(name: String, value: String) {
    BttSdk.setCustomVariable(name, value);
  }

   /**
   * Retrieves the value of a specific custom variable by name.
   * @param name - The name of the custom variable.
   * @returns The value of the custom variable, or undefined if not found.
   */
  static getCustomVariable(name: String) {
    return BttSdk.getCustomVariable(name);
  }

  /**
   * Sets multiple custom variables at once.
   * @param variables - A Map containing key-value pairs of custom variables.
   */
  static setCustomVariables(variables: Map<String,String>) {
    BttSdk.setCustomVariables(variables);
  }

   /**
   * Retrieves all custom variables.
   * @returns A Map of all custom variables.
   */
  static getCustomVariables() {
    return BttSdk.getCustomVariables();
  }

  /**
   * Clears a custom variable by name.
   * @param name - The name of the custom variable to remove.
   */
  static clearCustomVariable(name: String) {
    BttSdk.clearCustomVariable(name);
  }

   /**
   * Clears all custom variables.
   */
  static clearAllCustomVariables() {
    BttSdk.clearAllCustomVariables();
  }
}

export default BTTCustomVariable;