export const verifyAIRequest = (request: Request) => {
    const claims = request.auth.getClaims();
    
    if (claims.role !== 'mizan_developer') {
      throw new Error('Unauthorized AI access');
    }
  
    if (!claims.app_metadata?.ai_access) {
      throw new Error('AI features not enabled for this account');
    }
  };