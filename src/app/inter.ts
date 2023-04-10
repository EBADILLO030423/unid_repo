export interface LoginResponse {
    jwt:  string;
    user: User;
}

export interface User {
    id:        number;
    username:  string;
    email:     string;
    provider:  string;
    confirmed: boolean;
    blocked:   boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface RootObject {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id:         number;
    attributes: Attributes;
}

export interface Attributes {
    Month:       string;
    Year:        string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    page:      number;
    pageSize:  number;
    pageCount: number;
    total:     number;
}
export interface RootObject2 {
    data: Dat[];
    meta: Meta;
}

export interface Dat {
    id:         number;
    attributes: Attributes;
}

export interface Attributes {
    Docente:     string;
    CRN:         string;
    D:           boolean;
    L:           boolean;
    Ma:          boolean;
    Mi:          boolean;
    J:           boolean;
    V:           boolean;
    S:           boolean;
    HORAINICIO:  string;
    HORAFIN:     string;
    Registro:    number;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    page:      number;
    pageSize:  number;
    pageCount: number;
    total:     number;
}
export interface RootObject3 {
    data: Datoss[];
    meta: Meta;
}

export interface Datoss {
    id:         number;
    attributes: Attributes;
}

export interface Attributes {
    Docente:     string;
    Nombre:      string;
    Fecha:       string;
    Dia:         string;
    Hora:        string;
    Estado:      string;
    Tipo:        string;
    Registro:    number;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
}

export interface RootObject4 {
    id:        number;
    username:  string;
    email:     string;
    provider:  string;
    confirmed: boolean;
    blocked:   boolean;
    createdAt: Date;
    updatedAt: Date;
    Tipo:      string;
}