export function detecterCommentaires(texte) {
    var alphabet = /[%/*\w\s]/;
    var expressionReguliere = /\/\*((?:[^*]|(?:\*(?!\/)|(?:%\*))*))*\*\//g;
    var commentairesTrouves = [];
  
    commentairesTrouves = appliquerExpressionReguliere(expressionReguliere, texte);
  
    return commentairesTrouves;
  }
  
  function appliquerExpressionReguliere(expression, texte) {
    var matchesTrouves = [];
    var match;
  
    while ((match = expression.exec(texte)) !== null) {
      matchesTrouves.push(match[0]);
    }
  
    return matchesTrouves;
  }
