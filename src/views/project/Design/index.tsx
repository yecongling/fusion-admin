import {
  Card,
  Segmented,
  type SegmentedProps,
  Input,
  type InputRef,
} from "antd";
import { useEffect, useRef, useState } from "react";
import "./design.scss";
import { PlusOutlined } from "@ant-design/icons";
import ProjectCard from "./ProjectCard";
import { projectService } from "@/api/project/design/designApi";
import ProjectInfoModal from "./ProjectInfoModal";
import type { Project } from "./types";
import { usePreferencesStore } from "@/stores/store";

const { Search } = Input;

/**
 * 项目设计
 */
const Design: React.FC = () => {
  // 选中的分类
  const [type, setType] = useState<string>("");
  const { preferences } = usePreferencesStore();
  const { theme } = preferences;
  // 新增弹窗
  const [openAddProject, setOpenAddProject] = useState<boolean>(false);
  const searchRef = useRef<InputRef>(null);

  // 分段控制器选项
  const segmentedOptions: SegmentedProps["options"] = [
    {
      label: "全部",
      value: "",
    },
    {
      label: "集成项目",
      value: "1",
    },
    {
      label: "接口项目",
      value: "2",
    },
    {
      label: "三方项目",
      value: "3",
    },
  ];

  // 项目列表数据
  const [projects, setProjects] = useState<Project[]>([]);
  // 编辑的项目数据
  const [project, setProject] = useState<Project>();

  // 根据类型进行检索
  useEffect(() => {
    queryProject();
    searchRef.current?.focus();
  }, [type]);

  /**
   * 查询项目
   * @param projectName 项目名称
   */
  const queryProject = (projectName?: string) => {
    // 构建查询条件
    const queryCondition: Record<string, any> = {
      type,
      name: projectName,
    };
    projectService.getProjectList(queryCondition).then((res) => {
      setProjects(res);
    });
  };

  /**
   * 分段控制器切换
   * @param value 值
   */
  const onSegmentedChange = (value: string) => {
    setType(value);
  };

  /**
   * 新增项目
   */
  const addProject = () => {
    setOpenAddProject(true);
  };

  /**
   * 编辑项目
   * @param projectId 项目ID
   */
  const editProject = (projectId: string) => {
    // 根据ID从列表中获取项目具体信息
    const project = projects.find((item) => item.id === projectId);
    setProject(project);
    setOpenAddProject(true);
  };

  /**
   * 新增（编辑）项目确认
   */
  const onModalOk = (project: Project) => {
    // 首先确定是新增还是修改(有没有项目ID)
    if (project.id) {
      // 修改
      projectService.updateProject(project).then((success: boolean) => {
        if (success) {
          queryProject();
          setOpenAddProject(false);
        }
      });
    } else {
      // 新增
      projectService.addProject(project).then((success: boolean) => {
        if (success) {
          queryProject();
          setOpenAddProject(false);
        }
      });
    }
  };

  /**
   * 新增项目取消
   */
  const onModalCancel = () => {
    setOpenAddProject(false);
  };

  return (
    <>
      <div className="flex-1 pt-6 pr-6 pl-6 overflow-y-scroll bg-[#f5f6f7]">
        <div className="mb-[20px] text-[18px] font-bold">项目列表</div>
        {/* 卡片列表和筛选框 */}
        <div className="flex flex-row justify-between mb-[20px]">
          <Segmented<any>
            options={segmentedOptions}
            onChange={onSegmentedChange}
            value={type}
          />
          <div className="w-[300]">
            {/* 检索 */}
            <Search
              placeholder="请输入检索内容"
              ref={searchRef}
              onSearch={queryProject}
            />
          </div>
        </div>
        {/* 项目列表 */}
        <div className="flex flex-wrap mt-2">
          {/* 新建项目 */}
          <Card
            styles={{ body: { padding: "0px" } }}
            className="projectList addProject"
            onClick={addProject}
          >
            <p>
              <PlusOutlined
                className="text-[64px]"
                style={{ color: theme.colorPrimary }}
              />
              <span className="addTitle">新增项目</span>
            </p>
          </Card>
          {/* 项目列表 */}
          {projects.map((item) => (
            <ProjectCard
              key={item.id}
              id={item.id}
              name={item.name}
              background={item.background}
              type={item.type}
              onEditProject={editProject}
            />
          ))}
        </div>
      </div>
      {/* 新增弹窗 */}
      <ProjectInfoModal
        open={openAddProject}
        type={type}
        onOk={onModalOk}
        onCancel={onModalCancel}
        project={project}
      />
    </>
  );
};
export default Design;
