export class User {

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
     * @example 'Barros'
     */
    last_name: string;

    /**
     * Perfil del usuario
     * @example 'baig'
     */
    profile: string; 

    /**
     * Contraseña del usuario
     * @example '$2a$06$5z2oTmfEuKFt5sDjVAzM6eBavzp619GOON0Y9e6eNfU1Iv0MLKqRa'
     */
    password: string; 

    /**
     * Fecha de último login del usuario
     * @example '2024-02-03 00:51:05.325363'
     */
    last_login: Date;

    /**
     * Indica si el usuarip está activa
     * @example true
     * @
     */
    is_active: boolean;

    /**
     * Fecha de creación del usuario
     * @example '2024-02-03 00:51:05.325363'
     */
    created_at: Date;

    /**
     * Fecha de actualización del usuario
     * @example '2024-02-03 00:51:05.325363'
     */
    updated_at: Date;
}