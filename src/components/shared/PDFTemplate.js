import React from 'react';
import { Page, Text, Image, Document, StyleSheet, pdf, Font, View } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';
import logo from '../../img/Logo large with tagline black.png';
import checkArray from '../../lib/checkArray';
import parseDiet from '../../lib/parseDiet';

const saveBlob = (blob, filename) => {
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  let url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const savePdf = async (document, filename) => {
  saveBlob(await pdf(document).toBlob(), filename);
};

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const Logo = styled.Image`
  width: 30%;
  margin: 30px auto 20px;
`;

const Heading = styled.Text`
  margin: 10px;
  font-size: 18px;
  font-family: 'Oswald';
  text-align: center;
`;

const Price = styled.Text`
  margin: 10px;
  font-size: 16px;
  font-family: 'Oswald';
  text-align: center;
`;

const MenuGroup = styled.Text`
  margin: 10px;
  font-size: 16px;
  font-family: 'Times-Roman';
  text-transform: uppercase;
  text-align: center;
`;

const MenuItem = styled.Text`
  margin: 5px;
  font-size: 14px;
  font-family: 'Times-Roman';
  text-align: center;
  letter-spacing: 1px;
`;

const DietNote = styled.Text`
  padding: 5px;
  font-size: 12px;
  font-family: 'Times-Roman';
  text-align: center;
`;

const Footer = styled.View`
  position: absolute;
  bottom: 10px;
  margin-top: 20px;
`;

const SmallPrint = styled.Text`
  font-size: 10px;
  margin-bottom: 3px;
  font-style: italic;
  font-family: 'Times-Roman';
  text-align: center;
`;

// Create Document Component
export const PDFMenu = ({ menu }) => {
  console.log(menu);
  return (
    <Document>
      <Page>
        <Logo src={logo} />
        <View>
          <Heading>{menu.name}</Heading>
        </View>
        {checkArray(menu, 'sections')
          ? menu.sections.map(mm => (
              <View style={{ marginVertical: 20 }}>
                <MenuGroup>{mm.section}</MenuGroup>
                {checkArray(mm, 'dishes')
                  ? mm.dishes.map(d => (
                      <MenuItem>
                        {d.dish}{' '}
                        {checkArray(d, 'dietRestrictions')
                          ? d.dietRestrictions.map(dt => <DietNote>({parseDiet(dt.diet)})</DietNote>)
                          : null}
                      </MenuItem>
                    ))
                  : null}
              </View>
            ))
          : null}
        <Footer>
          <Price>{menu.price}</Price>
          {checkArray(menu, 'extras') ? menu.extras.map(e => <SmallPrint>{e}</SmallPrint>) : null}
        </Footer>
      </Page>
    </Document>
  );
};
