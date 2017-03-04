import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import Select from 'grommet/components/Select';

export class BlockImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image || '',
      content: props.content || '',
      imageSize: props.imageSize || 'Large'
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url !== this.props.url && this.props.url !== '') {
      this.setState({
        image: `${this.props.url}`
      });
    }
  }

  _onChange({ target, option }) {
    const key = target.id;
    let val = option || target.value;

    let obj  = {};
    obj[key] = val;

    this.setState(obj);
  }

  _validateForm({ image }) {
    if (image !== '')
      return true;

    return false;
  }

  _onSubmit(event) {
    event.preventDefault();
    const formData = Object.assign({}, this.state);
    this.props.onSubmit(formData);
  }

  render() {
    const { image, content, imageSize } = this.state;
    const { children } = this.props;
    const submit = (this._validateForm(this.state))
      ? this._onSubmit
      : undefined;

    return (
      <Box colorIndex="light-2" pad="medium">
        <Form compact={false} onSubmit={submit}>
          <FormFields>
            <fieldset>
              <FormField label="Description" htmlFor="content">
                <input autoFocus id="content" name="content" type="text"
                  value={content} onChange={this._onChange} />
              </FormField>
              <FormField label="Image file path" htmlFor="image">
                <input id="image" name="image" type="text"
                  value={image.path} onChange={this._onChange} />
              </FormField>
              <FormField label="Image Size" htmlFor="imageSize">
                <Select
                  id="imageSize"
                  inline={false}
                  options={["Small", "Medium", "Large", "Full"]}
                  value={imageSize}
                  onChange={this._onChange}
                />
              </FormField>
              {children && children}
            </fieldset>
            <Button onClick={submit} primary={false} type="submit"
              label="Done" />
          </FormFields>
        </Form>
      </Box>
    );
  }
};

BlockImageForm.propTypes = {
  onSubmit: PropTypes.func,
  data: PropTypes.object,
  url: PropTypes.string,
  children: PropTypes.node
};

export default BlockImageForm;