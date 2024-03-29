import React from 'react'
import {Pane,  Button, Checkbox, Badge, Pill} from "evergreen-ui";

class CheckboxModel {
    constructor(checked, label) {
        this.checked = checked;
        this.label = label;
    }
}

class Filter extends React.Component {
    constructor(props) {
        super(props)

        var checkboxList = [];
        const labels = ["Appliances", "Furniture"];
        for (let i = 0; i < 2; i++) {
            const currentCheckbox = new CheckboxModel(false, labels[i])
            checkboxList.push(currentCheckbox);
        }
        
        this.state = {
            checkboxList: checkboxList
        }
    }

    setChecked(state, index) {
        const newChecked = [...this.state.checkboxList]
        newChecked[index].checked = state;
        this.setState({
            checkboxList: newChecked
        });
    }

    filter() {
        const remainingCheckboxes = this.state.checkboxList.filter(checkbox => checkbox.checked == true);
        const filterLength = remainingCheckboxes.length;

        if (filterLength == 0){
            this.props.dataHandler(this.props.dataList);
            return;
        }

        let dataFiltering = function (data) {
            for (let i = 0; i < filterLength; i++) {
                if (data.tagNames.includes(remainingCheckboxes[i].label.toLowerCase())) {
                    return true;
                }
            }

            return false;
        }

        const filteredData = this.props.dataList.filter(data => dataFiltering(data));
        this.props.dataHandler(filteredData);
    }

    render() {

        const filter = this.filter.bind(this);
        return (
            <div>
                <Pane backgroundColor="white" borderRadius={20} width={250} marginTop={25} display="flex" justifyContent="flex-start" flexDirection="column" paddingTop={10} paddingBottom={20} position ="relative" flexWrap="wrap" marginRight={20} marginTop={40}>
                    <Pane marginTop={20} marginLeft = {20} display="flex" flexDirection="column" alignItems="flex-start" >
                        <span style={{fontSize:"30px"}}><b>Filter</b></span>

                        <Pane marginTop = {20}>
                            <span style={{fontSize:"20px"}} ><b>Dorm</b></span>
                            <Checkbox label = "Appliances" checked = {this.state.checkboxList[0].checked} onChange={e => this.setChecked(e.target.checked, 0)}/>
                            <Checkbox label = "Furniture" checked = {this.state.checkboxList[1].checked} onChange={e => this.setChecked(e.target.checked, 1)}/>
                        </Pane>
                        
                        <Button borderColor="#DE7548" color="#DE7548" borderRadius={10} onClick={filter}>Filter</Button>
                    </Pane>
                </Pane>
            </div>
        )
    }
}

export default Filter;