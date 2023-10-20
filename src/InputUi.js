
import parse, { domToReact } from 'html-react-parser';
import React from 'react';
import { ConditionalSection, IncrementButton, ShowValue, Switch, SwitchOption } from './web-components/definitions';

const snakeToCamel = str =>
  str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );

const transformAttributes = (attrs) => {
    const result = {};
    Object.entries(attrs).forEach(([key, value]) => {
        result[snakeToCamel(key)] = value;
    })

    return result;
}

const replaceHtml = (domNode) => {
    if(domNode.name === 'show-value') {
        return <ShowValue {...transformAttributes(domNode.attribs)}/>
    }

    if(domNode.name === 'increment-button') {
        return <IncrementButton {...transformAttributes(domNode.attribs)}/>
    }

    if(domNode.name === 'switch') {
        return (
            <Switch {...transformAttributes(domNode.attribs)}>
                {domToReact(domNode.children, {
                    replace: (childDomNode) => {
                        if(childDomNode.name === 'switch-option') {
                            return (
                                <SwitchOption {...transformAttributes(childDomNode.attribs)}>
                                    {domToReact(childDomNode.children)}
                                </SwitchOption>
                            )
                        }
                    }
                })}
            </Switch>
        )
    }
}


// In HTML that is returned from server, we need to replace internal <a /> tags with <Link />
// This component takes care fo that
const ParsedHtml = ({
    html,
}) => {
    const parsedHtml = parse(html, {
        replace: (domNode) => {
            if(domNode.name === 'conditional-section') {
                return (
                    <ConditionalSection {...transformAttributes(domNode.attribs)}>
                        {domToReact(domNode.children, {
                            replace: replaceHtml
                        })}
                    </ConditionalSection>
                )
            }

            return replaceHtml(domNode);
        },
    });

    return parsedHtml;
};

export default ParsedHtml;
