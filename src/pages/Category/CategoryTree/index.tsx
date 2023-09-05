import { useState } from "react";
import styled from "styled-components";
import { Category } from "../../../types/Inventory/Category";
import { colors } from "../../../theme";
import { ChevronCompactDown, ChevronCompactRight, PlusSquareDotted } from "../../../assets/svgs";
import { Paths } from "../../../constants";
import { GhostBtn } from "../../../components/buttons";
import { useDispatch } from "react-redux";
import { selectCategory } from "../actions";

interface Props {
  categories: Category[],
  navigate: any,
  selected: Category
}

const TreeContainer = styled.div`

  font-size: 0.9rem;
  
  .main-list {
    
    ul {
      border-left: 1px dashed ${colors.inputFocus};
      margin-left: 0.5rem;
    }

    li {
      padding-left: 0.2rem;
    }
  }

  .item-label {
    display: flex;
    align-items: center;

    span {
      cursor: pointer;

      &:hover {
        color: ${colors.inputFocus};
      }
    }
  }
`;

const reorganizeArray = (list: any[]): any[] => {

  let data = list.map(item => ({ ...item }));
  let organizedData: any[] = [];

  const findParent = (itemId: string): any => {
    let parent = data.find(item => item._id === itemId);
    return parent;
  };

  data.forEach(item => {
    if (!item.parent) {
      if (!organizedData.some(existingItem => existingItem._id === item._id)) {
        organizedData.push(item);
      }
    } else {

      //Get parent
      let parent = findParent(item.parent._id);

      // Create children
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        if (!parent.children.some((child: any) => child._id === item._id)) {
          parent.children.push(item);
        }
      }
    }
  });

  return organizedData;
}

function TreeNode({ node, navigate }: any) {
  
  const children = node.children;

  const [showChildren, setShowChildren] = useState(false);

  const handleShowChildren  = () => {
    setShowChildren(!showChildren)
  }

  const handleSelectCategory = (category: Category) => {
    navigate(`?${category._id}`)
  }

  return (
    <li>
      <div className="item-label">
        {
          (children && children.length > 0) ? (
            <span onClick={handleShowChildren}>
              {
                showChildren ? <ChevronCompactDown /> : <ChevronCompactRight />
              }
            </span>
          ) : (
            <span className="w-4"></span>
          )
        }
        <span onClick={() => handleSelectCategory(node)}>
          {node.name}
        </span>
      </div>
      {
        children && children.length > 0 && (
          <ul style={{
            display: showChildren ? 'block' : 'none'
          }}>
            {
              children.map((item: any, index: number) => (
                <TreeNode 
                  key={index} 
                  node={item} 
                  navigate={navigate} 
                />
              ))
            }
          </ul>
        )
      }
    </li>
  )
}

function CategoryTree({ categories, navigate, selected }: Props) {

  const list = reorganizeArray(categories);
  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(selectCategory(null));
    navigate(Paths.CATEGORY);
  }

  return (
    <div>
      <div className="p-2 text-blue-600">
      <GhostBtn onClick={handleCreate}>
        <PlusSquareDotted />
        <span>Create new</span>
      </GhostBtn>
      </div>
      <TreeContainer>
        <ul className="main-list">
          {
            list.map((item: any, index: number) => (
              <TreeNode 
                key={index} 
                navigate={navigate} 
                node={item}
              />
            ))
          }
        </ul>
      </TreeContainer>
    </div>
  );
}

export {
  CategoryTree
};