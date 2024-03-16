const findSection=(sections,id)=>{
    return sections
    .map(section=>{
        return {
            value : section._id,
            label : section.name
        }
    })
    .find(section=> section.value === id)
}
export default findSection