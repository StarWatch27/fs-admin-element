import { CreateCrudOptionsProps, CreateCrudOptionsRet, dict } from "@fast-crud/fast-crud";
import { addRequest, delRequest, editRequest, pageRequest } from "./api";

/**
 * 定义一个CrudOptions生成器方法
 */
export default async function ({ crudExpose, context }: CreateCrudOptionsProps): Promise<CreateCrudOptionsRet> {
  return {
    crudOptions: {
      // 在这里自定义你的crudOptions配置
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      //这里定义两个字段
      columns: {
        name: {
          title: "姓名",
          type: "text", //字段类型，fs会根据字段类型，生成出一些默认配置
          search: { show: true },
          column: {
            //表格列的一些配置
            resizable: true,
            width: 200
          }
        },
        type: {
          title: "类型",
          type: "dict-select",
          dict: dict({
            data: [
              { value: 1, label: "开始" },
              { value: 0, label: "停止" }
            ]
          })
        }
      }
    }
  };
}
