import {
  Parameter,
  ParameterCreationFields,
  ParameterUpdateFields,
} from "../domain/models/parameter";
import { db } from "./db";
import { BusinessException, Exception } from "../domain/exception";
import { cache } from "../helper/cache";

export class ParameterDbManager {
  docName: string = "parameters";
  cacheKey = "parameters";
  parameters: any;

  constructor() {
    this.parameters = db.collection(this.docName);
  }

  create = async (model: ParameterCreationFields) => {
    const param = await this.getByGroupAndKey(model.group, model.key);
    if (param)
      throw new BusinessException("key-group-parameter-already-exists");

    await this.parameters.add({
      ...model,
      group: model.group.toUpperCase(),
      createdAt: new Date(),
    });

    this.clearCache();
  };

  getAll = async (): Promise<Parameter[]> => {
    const cacheResult = cache.get(this.cacheKey);
    if (cacheResult) {
      return cacheResult as Parameter[];
    }

    const result: Parameter[] = [];
    const response = await this.parameters.get();

    if (response.empty) return result;

    response.forEach((doc: any) => {
      const parameter: Parameter = {
        id: doc.id,
        group: doc.data().group,
        key: doc.data().key,
        value: doc.data().value,
        description: doc.data().description,
        createdAt: doc.data().createdAt.toDate(),
      };

      result.push(parameter);
    });

    cache.set(this.cacheKey, result);

    return result;
  };

  getById = async (id: string): Promise<Parameter> => {
    const response = await this.parameters.doc(id).get();
    if (!response.exists) throw new Exception("no-parameter-found");

    const data = response.data();
    const parameter: Parameter = {
      id: response.id,
      ...(data as any),
    };

    return parameter;
  };

  update = async (id: string, data: ParameterUpdateFields) => {
    await db.runTransaction(async (t: any) => {
      const doc = this.parameters.doc(id);
      const tDoc = await t.get(doc);
      if (data.group) {
        const param = await this.getByGroupAndKey(data.group, tDoc.data().key);
        if (param && param.id !== id)
          throw new BusinessException("key-group-parameter-already-exists");
      }

      t.update(doc, { ...data, group: data.group?.toUpperCase() });
    });

    this.clearCache();
  };

  delete = async (id: string) => {
    await this.parameters.doc(id).delete();

    this.clearCache();
  };

  private clearCache = () => {
    cache.set(this.cacheKey, undefined);
  };

  private getByGroupAndKey = async (
    group: string,
    key: string
  ): Promise<Parameter | undefined> => {
    const response = await this.parameters
      .where("group", "==", group.toUpperCase())
      .where("key", "==", key)
      .get();
    if (response.empty) return undefined;

    const doc = response.docs[0];
    const parameter: Parameter = {
      id: doc.id,
      ...doc.data(),
    };

    return parameter;
  };
}
