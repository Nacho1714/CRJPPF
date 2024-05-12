interface SeedDirectorateHasSector {
  directorate_fk: number;
  sector_fk: number;
}

interface SeedDirectorateHasSectorData {
  directorateHasSector: SeedDirectorateHasSector[];
}

export const initialDirectorateHasSectorData: SeedDirectorateHasSectorData = {
  directorateHasSector: [
    {
      directorate_fk: 1,
      sector_fk: 2,
    },
    {
      directorate_fk: 2,
      sector_fk: 5,
    },
    {
      directorate_fk: 2,
      sector_fk: 6,
    },
    {
      directorate_fk: 2,
      sector_fk: 11,
    },
    {
      directorate_fk: 2,
      sector_fk: 12,
    },
    {
      directorate_fk: 3,
      sector_fk: 13,
    },
    {
      directorate_fk: 4,
      sector_fk: 13,
    },
    {
      directorate_fk: 4,
      sector_fk: 4,
    },
    {
      directorate_fk: 4,
      sector_fk: 7,
    },
    {
      directorate_fk: 4,
      sector_fk: 8,
    },
    {
      directorate_fk: 4,
      sector_fk: 10,
    },
    {
      directorate_fk: 4,
      sector_fk: 14,
    },
    {
      directorate_fk: 4,
      sector_fk: 20,
    },
    {
      directorate_fk: 5,
      sector_fk: 9,
    },
    {
      directorate_fk: 5,
      sector_fk: 15,
    },
    {
      directorate_fk: 6,
      sector_fk: 16,
    },
    {
      directorate_fk: 7,
      sector_fk: 17,
    },
    {
      directorate_fk: 7,
      sector_fk: 19,
    },
    {
      directorate_fk: 8,
      sector_fk: 18,
    },
    {
      directorate_fk: 9,
      sector_fk: 21,
    },
    {
      directorate_fk: 10,
      sector_fk: 3,
    },
    {
      directorate_fk: 10,
      sector_fk: 22,
    },
    {
      directorate_fk: 10,
      sector_fk: 23,
    },
    {
      directorate_fk: 10,
      sector_fk: 24,
    },
    {
      directorate_fk: 11,
      sector_fk: 25,
    },
  ],
};
