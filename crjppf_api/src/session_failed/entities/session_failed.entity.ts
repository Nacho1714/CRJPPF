export class SessionFailed {

    /**
     * Primary Key de la sesión fallida
     * @example 1
     */
    session_failed_id: number;

    /**
     * Nombre del usuario
     * @example 'baig'
     */
    user_name: string;

    /**
     * Fecha de creación de la dirección
     * @example '2024-02-03 00:51:05.325363'
     */
    created_at: Date;
}