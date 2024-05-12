interface SeedDirectorate {
    name: string;
}

interface SeedDirectorateData {
    directorate: SeedDirectorate[];
}

export const initialDirectorateData: SeedDirectorateData = { 
    directorate: [
        {name: "AYUDANTIA POLICIAL"},
        {name: "DIRECCION ADMINISTRACION"},
        {name: "DIRECCION ASUNTOS JURIDICOS"},
        {name: "DIRECCION BENEFICIARIOS"},
        {name: "DIRECCION DE CONTROL Y PREVENCION"},
        {name: "DIRECCION DE INFORMATICA Y SISTEMAS"},
        {name: "DIRECCION DE RECURSOS HUMANOS"},
        {name: "DIRECCION GENERAL DE OPERACIONES"},
        {name: "PRESIDENCIA"},
        {name: "SECRETARIA GENERAL"},
        {name: "UNIDAD DE AUDITORIA INTERNA"}
    ]
}