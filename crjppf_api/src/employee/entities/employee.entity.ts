export class Employee {

    /**
     * Primary Key del empleado
     * @example 1
     */
    employee_id: number;

     /**
     * Foreign Key del cargo
     * @example 1
     */
     position_fk: number;
     
     /**
      * Foreign Key de la oficina
      * @example 1
      */
     destination_fk: number;
     
     /**
      * Nombre del empleado
      * @example 'Ignacio Ezequiel'
      */
     name: string;
     
     /**
      * Apellido del empleado
      * @example 'Barros'
      */
     last_name: string;
     
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