export class UserWithToken {

    /**
     * Primary key del usuario
     * @example 1
     */
    user_id: number;

    /**
     * Nombre del usuario
     * @example 'Ignacio Ezequiel'
     */
    name: string;

    /**
     * Apellido del usuario
     * @example Barros
     */
    last_name: string;

    /**
     * Perfil del usuario
     * @example baig
     */
    profile: string;

    /**
     * Token de autenticación
     * @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5NiwiaWF0IjoxNzA3NDA4OTU1LCJleHAiOjE3MDc0OTUzNTV9.-87PQ7EDtn-z7oPeM4BlE0WtSAN07vv1YQmzYQYvOi8
     */
    token: string;
}