export class ProjectProgressHelper {

  static getProgressDescription(progress: string): string {
    switch (progress) {
      case "new": return "Criado";
      case "analyze": return "Em análise";
      case "in-progress": return "Em andamento";
      case "stopped": return "Parado";
      case "finish": return "Finalizado";
      case "cancel": return "Cancelado";

      default:
        break;
    }
  }

}
