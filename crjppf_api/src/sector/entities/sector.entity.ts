export class Sector {

    /**
     * Primary Key del sector
     * @example 1
     */
    sector_id: number;

    /**
     * Nombre del sector
     * @example 'DEPARTAMENTO PASIVIDADES'
     */
    name: string;

     /**
      * Indicada si el empleado está activo
      * @example true
      */
     is_active: boolean = true;

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