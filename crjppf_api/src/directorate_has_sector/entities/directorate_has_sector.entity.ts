export class DirectorateHasSector {

    /**
     * Primary key de la oficina
     * @example 1
     */
    destination_id: number;

    /**
     * Foreign key de la dirección
     * @example 1
     */
    directorate_fk: number;

    /**
     * Foreign key del sector
     * @example 1
     */
    sector_fk: number;

    /**
     * Nombre de la oficina
     * @example 'PRESIDENCIA - DEPARTAMENTO PASIVIDADES'
     */
    name: string;

    /**
     * Piso del edificio
     * @example '1'
     */
    level?: string;

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