import React from "react";
import { Controller, get } from "react-hook-form";
import { removeDoubleQuotes } from "@/utils/helper";
import {
  FormDropdown,
  FormField,
  FormGroup,
  FormInput,
  FormRadio,
  FormTextArea,
  Grid,
  GridColumn,
} from "semantic-ui-react";
import ReactQuill from "react-quill";

function AsForm({ children, control, errors, onSubmit = () => {}, ...rest }) {
  return (
    <form className="ui form errorLabel" onSubmit={onSubmit} {...rest}>
      <Grid>
        {React.Children.map(children, (child) => {
          const { name, width = 16, mobile = 16, computer = 8 } = child.props;
          if (!name) return child;
          const error = get(errors, name, null);
          return React.createElement(child.type, {
            ...{
              ...child.props,
              control,
              key: name,
              error: error && { content: removeDoubleQuotes(error?.message) },
              width,
              mobile,
              computer,
            },
          });
        })}
      </Grid>
    </form>
  );
}

function AsInput({
  control,
  defaultValue,
  name,
  width,
  label,
  required,
  children,
  mobile,
  computer,
  ...rest
}) {
  return (
    <GridColumn mobile={mobile} computer={computer} width={width}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <FormField required={required}>
            <label htmlFor={name} className="tal">
              {label}
            </label>
            {children}
            <FormInput
              value={value}
              id={name}
              onChange={(e, { value: val }) => onChange(val)}
              {...rest}
            />
            {rest?.maxLength && (
              <div className="input-cnt">
                {value?.length ? value?.length : 0}/{rest?.maxLength}
              </div>
            )}
          </FormField>
        )}
      />
    </GridColumn>
  );
}
function AsTextArea({
  control,
  name,
  width,
  label,
  children,
  required,
  mobile,
  computer,
  ...rest
}) {
  return (
    <GridColumn mobile={mobile} computer={computer} width={width}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <FormField required={required}>
            <label>{label}</label>
            {children}
            <FormTextArea
              value={value}
              onChange={(e, { value: val }) => onChange(val)}
              {...rest}
            />
            {rest?.maxLength && (
              <div className="input-cnt">
                {value?.length ? value?.length : 0}/{rest?.maxLength}
              </div>
            )}
          </FormField>
        )}
      />
    </GridColumn>
  );
}

function AsSelect({
  control,
  name,
  width,
  children,
  required,
  label,
  mobile,
  computer,
  ...rest
}) {
  return (
    <GridColumn mobile={mobile} computer={computer} width={width}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <FormField required={required}>
            <label htmlFor={name}>{label}</label>
            {children}
            <FormDropdown
              selection
              id={name}
              value={value}
              onChange={(e, { value: val }) => onChange(val)}
              {...rest}
            />
          </FormField>
        )}
      />
    </GridColumn>
  );
}

function AsCheckbox({
  control,
  name,
  width,
  required,
  label,
  children,
  ...rest
}) {
  return (
    <GridColumn width={width}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <FormField required={required}>
            <AsCheckbox
              id={name}
              checked={value}
              onChange={(e, { checked }) => onChange(checked)}
              {...rest}
            />
            <label htmlFor={name}>{label}</label>
            {children}
          </FormField>
        )}
      />
    </GridColumn>
  );
}

//! extremely poor API , would update or discard in future
function AsRadio({
  width,
  control,
  name,
  label,
  optionList,
  columnProps = {},
  // ...rest
}) {
  // ? options example : [{label:'Male', radioValue:'male'}]
  return (
    <GridColumn width={width} {...columnProps}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <FormField>
            <label>{label}</label>
            <FormGroup>
              {optionList.map(({ radioValue, label, ...restOptions }) => (
                <FormRadio
                  key={`radiovalue__${radioValue}`}
                  value={radioValue}
                  checked={value === radioValue}
                  label={label}
                  onChange={(e, { value: val }) => onChange(val)}
                  {...restOptions}
                />
              ))}
            </FormGroup>
          </FormField>
        )}
      />
    </GridColumn>
  );
}

function AsEditor({
  control,
  name,
  label,
  required = false,
  width = 16,
  mobile = 16,
  computer = 16,
  modules = {}, // Customizable Quill modules
  // formats = [], // Customizable Quill formats
  ...rest
}) {
  return (
    <GridColumn mobile={mobile} computer={computer} width={width}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormField required={required}>
            <label htmlFor={name}>{label}</label>
            <ReactQuill
              style={{
                width: "100%",
                minHeight: "100px",
                background: "white",
              }}
              theme="snow"
              modules={modules}
              // formats={formats}
              value={field.value || ""}
              onChange={field.onChange}
              {...rest}
            />
            {error && (
              <div className="ui pointing above prompt label" role="alert">
                {error.message}
              </div>
            )}
          </FormField>
        )}
      />
    </GridColumn>
  );
}

// function Editor({control, error, name, width, label, formFieldProps, ...rest}) {
//   return (
//     <VmoGridColumn width={width}>
//       <Controller
//         name={name}
//         control={control}
//         render={({field: {value, onChange, onBlur}}) => (
//           <VmoFormField>
//             <label>{label}</label>
//             <VmoEditor
//               setDefaultStyle="color:#828ea7"
//               setContents={value}
//               onBlur={onBlur}
//               onChange={content => {
//                 onChange(content)
//               }}
//               {...rest}
//             />
//             {error && (
//               <div className="ui pointing above prompt label" role="alert" aria-atomic="true">
//                 {error.content}
//               </div>
//             )}
//           </VmoFormField>
//         )}
//       />
//     </VmoGridColumn>
//   )
// }

// function DateTimePicker({control, name, label, error, width, formFieldProps, ...rest}) {
//   return (
//     <VmoGridColumn width={width}>
//       <Controller
//         name={name}
//         control={control}
//         render={({field: {value, onChange}}) => (
//           <VmoFormField {...formFieldProps}>
//             <label htmlFor="date-time-picker">{label}</label>

//             <VmoDatePicker
//               id="date-time-picker"
//               className="vmo-picker"
//               value={value}
//               onChange={value => onChange(value)}
//               inputProps={{
//                 component: props => <input {...props} readOnly />,
//               }}
//               {...rest}
//             />

//             {error && (
//               <div className="ui pointing above prompt label" role="alert" aria-atomic="true">
//                 {error.content}
//               </div>
//             )}
//           </VmoFormField>
//         )}
//       />
//     </VmoGridColumn>
//   )
// }

export { AsForm, AsInput, AsTextArea, AsSelect, AsCheckbox, AsRadio, AsEditor };
