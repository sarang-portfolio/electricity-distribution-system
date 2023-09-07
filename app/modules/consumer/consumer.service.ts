import { ConsumerConstants } from "./consumer.constants";
import consumerRepo from "./consumer.repo";
import { IConsumer } from "./consumer.types";

const getAllConsumer = async (
  limit?: number,
  offset?: number,
  sortBy?: string,
  orderBy?: string,
  searchBy?: string
) => {
  try {
    return await consumerRepo.getAll(limit, offset, sortBy, orderBy, searchBy);
  } catch (err) {
    throw ConsumerConstants.NOT_FOUND;
  }
};

const getOneConsumer = async (id: number) => {
  try {
    return await consumerRepo.getOne(id);
  } catch (err) {
    throw ConsumerConstants.NOT_FOUND;
  }
};

const createConsumer = async (consumer: IConsumer) => {
  try {
    await consumerRepo.create(consumer);
    return ConsumerConstants.CONSUMER_ADDED;
  } catch (err) {
    throw ConsumerConstants.CONSUMER_NOT_ADDED;
  }
};

const updateConsumer = async (id: number, consumer: IConsumer) => {
  try {
    await consumerRepo.update(id, consumer);
    return ConsumerConstants.CONSUMER_UPDATED;
  } catch (err) {
    throw ConsumerConstants.CONSUMER_NOT_UPDATED;
  }
};

const removeConsumer = async (id: number) => {
  try {
    await consumerRepo.remove(id);
    return ConsumerConstants.CONSUMER_DELETED;
  } catch (err) {
    throw ConsumerConstants.CONSUMER_NOT_DELETED;
  }
};

const assignAgent = async (data: any) => {
  try {
    const { consumerId, userId } = data;
    await consumerRepo.update(consumerId, { userId });
    return ConsumerConstants.AGENT_ASSIGNED;
  } catch (err) {
    throw ConsumerConstants.AGENT_NOT_ASSIGNED;
  }
};

const getConsumerDetails = async (userId: string) => {
  try {
    return await consumerRepo.getConsumerDetails(userId);
  } catch (err) {
    throw ConsumerConstants.NOT_FOUND;
  }
};

const getAssignedUsers = async (userId: number, meterId: number) => {
  try {
    return await consumerRepo.getAssignedUsers(userId, meterId);
  } catch (err) {
    throw ConsumerConstants.NOT_FOUND;
  }
};

export default {
  getAllConsumer,
  getOneConsumer,
  createConsumer,
  updateConsumer,
  removeConsumer,
  assignAgent,
  getConsumerDetails,
  getAssignedUsers,
};
