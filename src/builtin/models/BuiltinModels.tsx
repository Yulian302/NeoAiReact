
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModelsTemplate from "../../templates/models/ModelsTemplate";
import getModels from "../api/getModels";
import { AxiosResponse } from "axios";
import { Model, Models } from "../../templates/models/types";
import { FiCommand } from "react-icons/fi";

const BuiltinModels: React.FC = () => {
  const [models, setModels]: [Models, Dispatch<SetStateAction<Models>>] =
    useState<Models>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchModels = async () => {
      const response: AxiosResponse<Model[]> = await getModels();
      setModels(response.data);
    };
    fetchModels().then((r) => setIsLoading(false));
  }, []);
  return isLoading ? (
    <div className="flex items-center justify-center">
      <FiCommand className="loadingSpinner" />
    </div>
  ) : (
    <ModelsTemplate models={models} />
  );
};

export default BuiltinModels;
