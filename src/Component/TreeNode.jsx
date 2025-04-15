/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'

export default function TreeNode({node,checked,setChecked}) {
  //1. check current recived node(prop) has children or not if it has children then its parrent 
    const isParent=node.children && node.children.length >0 
    console.log(node.label, " is parent " ,isParent)
//2. check current state (checked or not checked )
const isChecked =checked[node.label]|| false
console.log(node.label, " is checked " ,isChecked)

//3. here we need to check the parent which has childrens , 
// if some childrens are selected or not , if some childres are selected but not all children selected 
// that means parent has indterminate state 
// indeteminate state of checkbox means a third state neither checked not unchecked

const isIndeterminate= isParent && node.children.some((child)=>checked[child.label]) && !node.children.every((child)=>checked[child.label])
// in above we have checked current node isparent if yes, then check some childrens are selected? if yes, then check all childrens are selected? if yes,then its not indeterminare if no its indeterminate  

console.log("parnet is isInderminate ",isIndeterminate)

//5. create a function which handles the checkbox click event 
const handleCheckboxChange=()=>{

//1. get current checked list in varibale so that whatever changed in current checkbox status will be updated 

const newChecked = { ...checked };
//2. add new Property(key value) pair of this changed state
newChecked[node.label] = !isChecked;

//3.if parent is checked then all childrens should also get checked 

if (isParent) {
    node.children.forEach((child) => {
        newChecked[child.label] = newChecked[node.label];
    });
}

setChecked(newChecked);

//4.set main state vaible of checked which has all current values which options are selsected

    
}
useEffect(() => {
    const checkbox = document.getElementById(node.label);
    if (checkbox) {
        checkbox.indeterminate = isIndeterminate;
    }
}, [isIndeterminate]);

useEffect(() => {
    if (isParent) {
        const allChecked = node.children.every((child) => checked[child.label]);
        const someChecked = node.children.some((child) => checked[child.label]);

        setChecked((prev) => {
            // Avoid unnecessary updates
            if (prev[node.label] === allChecked && prev[`${node.label}_indeterminate`] === (someChecked && !allChecked)) {
                return prev;
            }

            return {
                ...prev,
                [node.label]: allChecked,
                [`${node.label}_indeterminate`]: someChecked && !allChecked,
            };
        });
    }
}, [checked, isParent, node, setChecked]);

    return (
        //4 render the checked boxed 
    <div style={{margin:"20px"}}>
      <input type='checkbox'
      checked={isChecked}
      
      onChange={handleCheckboxChange}
      ref={(el) => el && (el.indeterminate = isIndeterminate)}
      />{"  "}{node.label}
{
    isParent && node.children.map((child)=><TreeNode key={child.label} node={child} checked={checked} setChecked={setChecked}></TreeNode>)
}
      
    </div>
  )

}
