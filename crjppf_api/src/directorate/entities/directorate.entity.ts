export class Directorate {

    /**
     * Primary key de la dirección
     * @example 1
     */
    directorate_id: number;

    /**
     * Nombre de la dirección
     * @example 'Dirección de Informática'
     */
    name: string;

    /**
     * Indica si la dirección está activa
     * @example true
     * @
     */
    is_active: boolean;

    /**
     * Fecha de creación de la dirección
     * @example '2024-02-03 00:51:05.325363'
     */
    created_at: Date;

    /**
     * Fecha de actualización de la dirección
     * @example '2024-02-03 00:51:05.325363'
     */
    updated_at: Date;
}