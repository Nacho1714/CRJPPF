import { document_options } from "../../common/interfaces/enum/document_options.enum"

export class Visitor {

    /**
     * Primary key del usuario
     * @example 1
     */
    visitor_id: number;

    /**
     * Foreign Key del usuario
     * @example 1
     */
    user_fk: number;
    
    /**
     * Foreign Key del empleado
     * @example 1
     */
    employee_fk: number;

    /**
     * Foreign Key de la oficina
     * @example 1
     */
    destination_fk: number;

    /**
     * Nombre del visitante
     * @example 'Juan'
     */
    name: string;

    /**
     * Apellido del visitante
     * @example 'Perez'
     */
    last_name: string;

    /**
     * Tipo de documento
     * @example 'DNI'
     */
    document_type: document_options;

    /**
     * Número de documento
     * @example '43568465'
     */
    document_number: string;

    /**
     * Imagen del visitante
     * @example 'http://localhost:3000/api/visitor/image/b1c1da1f-eca6-4950-b63a-c15e6ac8c2bc.jpeg'
     */
    image: string;
    
    /**
     * Nota
     * @example 'Es un visitante importante'
     */
    note?: string = null;

    /**
     * Fecha de ingreso
     * @example '2024-02-03 06:51:05.183'
     */
    entry: Date;
    
    /**
     * Fecha de salida
     * @example '2024-02-03 09:22:23.124'
     */
    exit?: Date = null;

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