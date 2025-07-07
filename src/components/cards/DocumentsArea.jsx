import styled, { useTheme } from "styled-components";
import { JsonEditor, defaultTheme, githubDarkTheme } from "json-edit-react";
import { useTranslation } from "react-i18next";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useAuth from "../../hooks/useAuth";

export default function DocumentsArea({ info }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { numOfColumns } = useAuth();

  return (
    <DocumentsContainer>
      {info &&
        Object.keys(info).map((typeKey) => (
          <Accordion
            key={typeKey}
            defaultExpanded
            slotProps={{ transition: { timeout: 1000 } }}
            sx={{
              background: "transparent",
              border: "none",
              boxShadow: "none",
              padding: "0px",
              margin: "0px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${typeKey}-panel-content`}
              id={`${typeKey}-header`}
              sx={{
                padding: "0px",
              }}
            >
              <h3>{typeKey.charAt(0).toUpperCase() + typeKey.slice(1)}</h3>{" "}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: "0px 7px 5px 0px",
                maxHeight: "80vh",
                overflowY: "auto",

                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  background: theme.colors.documents.scrollBack,
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.colors.documents.scrollbar,
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: theme.colors.documents.scrollHover,
                },
              }}
            >
              <CardsBox $columns={numOfColumns}>
                {info[typeKey].map((documentItem) => (
                  <DocumentCard key={documentItem.id}>
                    <JsonEditor
                      data={documentItem}
                      rootName={documentItem.document?.fqdn || "Document Data"}
                      viewOnly
                      indent={2}
                      collapse={3}
                      collapseAnimationTime={150}
                      showCollectionCount="when-closed"
                      rootFontSize="15px"
                      translations={{
                        ITEM_SINGLE: `{{count}} ${t("item")}`,
                        ITEMS_MULTIPLE: `{{count}} ${t("items")}`,
                      }}
                      theme={
                        theme.mode === "light"
                          ? [
                              defaultTheme,
                              { container: { backgroundColor: "transparent" } },
                            ]
                          : [
                              githubDarkTheme,
                              { container: { backgroundColor: "transparent" } },
                            ]
                      }
                    />
                  </DocumentCard>
                ))}
              </CardsBox>
            </AccordionDetails>
          </Accordion>
        ))}
      {info && Object.keys(info).length === 0 && (
        <h2
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: theme.colors.textSecondary,
          }}
        >
          {t("noDocumentsFound")}
        </h2>
      )}
    </DocumentsContainer>
  );
}

const DocumentsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  //gap: 15px;
  padding: 15px 0;

  h3 {
    color: #005564;
  }
`;

const CardsBox = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns || 4}, 1fr);
  gap: 20px;
`;

const DocumentCard = styled.div`
  //width: 450px;
  //height: 250px;
  border-radius: 5px;
  padding: 0px;
  background-color: ${(props) => props.theme.colors.documents.backgroundColor};
  border: 1px solid ${(props) => props.theme.colors.documents.downButton};
  box-shadow: 0 1px 2px rgb(0 0 0 / 24%);
  cursor: pointer;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
  display: flex;
  gap: 10px;

  &:hover {
    box-shadow: 0 4px 8px rgb(0 0 0 / 24%);
  }

  flex-shrink: 0; /* Impede que o item encolha */

  &.scroll {
    width: 370px;
  }
`;
