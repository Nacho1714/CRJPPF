import { Injectable, Logger } from '@nestjs/common';
import { DirectorateService } from '../directorate/directorate.service';
import { DirectorateHasSectorService } from '../directorate_has_sector/directorate_has_sector.service';
import { EmployeeService } from '../employee/employee.service';
import { PositionService } from '../position/position.service';
import { PrismaService } from '../prisma/prisma.service';
import { SectorService } from '../sector/sector.service';
import { UserService } from '../user/user.service';
import { 
    initialDirectorateData,
    initialUserData,
    initialEmployeeData,
    initialPositionData,
    initialSectorData,
    initialDirectorateHasSectorData 
} from './data';


@Injectable()
export class SeedService {
    private readonly logger = new Logger('SeedService')

    constructor(
        private readonly prisma:                        PrismaService,
        private readonly directorateService:            DirectorateService,
        private readonly sectorService:                 SectorService,
        private readonly directorateHasSectorService:   DirectorateHasSectorService,
        private readonly positionService:               PositionService,
        private readonly employeeService:               EmployeeService,
        private readonly userService:                   UserService,
    ) {}

    async runSeed(): Promise<string> {
        try {
            await this.deleteAllRecords();
            await this.insertNewDirectorates();
            await this.insertNewSectors();
            await this.insertNewDirectorateHasSector();
            await this.insertNewPositions();
            await this.insertNewEmployees();
            await this.insertNewUsers();

            return 'Seed executed'
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);            
        }
    }

    private async insertNewDirectorates() {
        const directorates = initialDirectorateData.directorate;

        directorates.sort((a, b) => a.name.localeCompare(b.name));

        const insertPromises = [];

        directorates.forEach(directorate => {
            insertPromises.push(this.directorateService.create(directorate))
        });

        await Promise.all(insertPromises);

        return true;
    }

    private async insertNewSectors() {
        const sectors = initialSectorData.sector;

        sectors.sort((a, b) => a.name.localeCompare(b.name));

        const insertPromises = [];

        sectors.forEach(sector => {
            insertPromises.push(this.sectorService.create(sector))
        });

        await Promise.all(insertPromises);

        return true;
    }

    private async insertNewDirectorateHasSector() {
        const destinations = initialDirectorateHasSectorData.directorateHasSector;

        const insertPromises = [];

        destinations.forEach(destination => {
            insertPromises.push(this.directorateHasSectorService.create(destination))
        });

        await Promise.all(insertPromises);

        return true;
    }

    private async insertNewPositions() {
        const positions = initialPositionData.position;

        const insertPromises = [];

        positions.forEach(position => {
            insertPromises.push(this.positionService.create(position))
        });

        await Promise.all(insertPromises);

        return true;
    }

    private async insertNewEmployees() {
        const employees = initialEmployeeData.employee;

        const insertPromises = [];

        employees.forEach(employee => {
            insertPromises.push(this.employeeService.create(employee))
        });

        await Promise.all(insertPromises);

        return true;
    }

    private async insertNewUsers() {

        const users = initialUserData.user;

        const insertPromises = [];

        users.forEach(user => {
            insertPromises.push(this.userService.create(user))
        });

        await Promise.all(insertPromises);

        return true;
    }

    private async deleteAllRecords() {
        await this.prisma.$executeRaw`TRUNCATE "visitor", "session_failed", "user", "employee" , "position", "directorate", "sector", "directorate_has_sector" RESTART IDENTITY`;
    }
}
