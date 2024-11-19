declare namespace Express {
    export interface Request {
        user?: any; // Puedes especificar un tipo más estricto si tienes un objeto definido para el payload del JWT
    }
}