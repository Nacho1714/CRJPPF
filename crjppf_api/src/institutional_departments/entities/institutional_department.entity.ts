export class InstitutionalDepartment {

    /**
     * Primary key del usuario
     * @example 1
     */
    institutional_departments_id: number;

    /**
     * Foreign Key del usuario
     * @example 1
     */
    government_institutions_fk: number;

    /**
     * Nombre del visitante
     * @example 'Juan'
     */
    name: string;

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
