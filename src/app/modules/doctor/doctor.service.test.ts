import prisma from '../../../shared/prisma';
import { DoctorService } from './doctor.service';

describe('DoctorService', () => {
  beforeAll(async () => {
    // Setup any necessary data or environment before running tests
  });

  afterAll(async () => {
    // Clean up any resources or data after running tests
    await prisma.$disconnect();
  });

  describe('create', () => {
    it('should create a new doctor', async () => {
      // Test creation of a new doctor
      const newDoctorData = { /* Provide necessary data for creating a new doctor */ };
      const createdDoctor = await DoctorService.create(newDoctorData);
      expect(createdDoctor).toBeDefined();
      // Add more assertions as needed
    });
  });

  describe('getAllDoctors', () => {
    it('should get all doctors based on provided filters and pagination options', async () => {
      // Test getting all doctors based on provided filters and pagination options
      const filters = { /* Provide necessary filters */ };
      const options = { /* Provide pagination options */ };
      const result = await DoctorService.getAllDoctors(filters, options);
      expect(result).toBeDefined();
      // Add more assertions as needed
    });
  });

  // Add more test cases for other service methods like getAllunverifiedDoctors, getDoctor, deleteDoctor, updateDoctor, etc.
  
  describe('create', () => {
    it('should throw an error if creation fails', async () => {
      // Mocking Prisma to throw an error when creating a doctor
      prisma.$transaction = jest.fn().mockRejectedValue(new Error('Failed to create doctor'));
      
      // Test that an error is thrown when creating a new doctor
      const newDoctorData = { /* Provide necessary data for creating a new doctor */ };
      await expect(async () => {
        await DoctorService.create(newDoctorData);
      }).rejects.toThrow('Failed to create doctor');
    });
  });
});
