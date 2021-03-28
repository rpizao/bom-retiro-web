export class DepartmentHelper {
  static getClassifierIcon(classifier: string): string {
    switch (classifier) {
      case "health": return "heart-half";

      default:
        break;
    }
  }

  static getClassifierDescription(classifier: string): string {
    switch (classifier) {
      case "health": return "Saúde";

      default:
        break;
    }
  }
}
