import { Box, Typography, Divider, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

const CustomList = ({ customIcon, title, listContent, headers }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "1100px",
          height: "100%",
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            color: "white",
            fontFamily: "Raleway",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            pt: "30px",
          }}
        >
          {headers.map((header) => (
            <>
              <Box sx={{ minWidth: "350px" }}>
                <Typography
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    fontFamily: "Raleway",
                    fontWeight: "bold",
                  }}
                >
                  {header.text1}
                </Typography>
              </Box>
              <Box sx={{ minWidth: "250px", ml: "10px" }}>
                <Typography
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    fontFamily: "Raleway",
                    fontWeight: "bold",
                  }}
                >
                  {header.text2}
                </Typography>
              </Box>
              <Box sx={{ minWidth: "250px", ml: "10px" }}>
                <Typography
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    fontFamily: "Raleway",
                    fontWeight: "bold",
                  }}
                >
                  {header.text3}
                </Typography>
              </Box>
              <Box sx={{ minWidth: "150px", ml: "10px" }}>
                <Typography
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    fontFamily: "Raleway",
                    fontWeight: "bold",
                  }}
                >
                  {header.text4}
                </Typography>
              </Box>
            </>
          ))}
        </Box>
        <Divider sx={{ color: "white", mb: "30px", fontWeight: "bold" }} />
        <Box
          id="customList"
          sx={{ width: "1100px", height: "100%", overflowY: "auto" }}
        >
          {listContent.map((item) => (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    minWidth: "350px",
                    maxWidth: "350px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      color: "white",
                      fontFamily: "Raleway",
                      fontWeight: "bold",
                    }}
                  >
                    <Link
                      to={`/${item.type}/${item.id}`}
                      style={{
                        textDecorationColor: "white",
                        fontFamily: "Raleway",
                        color: "white",
                      }}
                    >
                      {item.text1}
                    </Link>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    minWidth: "250px",
                    maxWidth: "250px",
                    ml: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      color: "white",
                      fontFamily: "Raleway",
                      fontWeight: "bold",
                    }}
                  >
                    {item.text2}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    minWidth: "250px",
                    maxWidth: "250px",
                    ml: "10px",
                  }}
                >
                  {customIcon ? (
                    <FavoriteIcon
                      sx={{ color: "white" }}
                      fontSize="large"
                      onClick={() => {
                        console.log(item);
                      }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "white",
                        fontFamily: "Raleway",
                        fontWeight: "bold",
                      }}
                    >
                      {item.text3}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    minWidth: "150px",
                    ml: "10px",
                  }}
                >
                  <img height="80px" src={item.text4} alt="album cover" />
                </Box>
              </Box>
              <Divider sx={{ color: "white", my: "30px" }} />
            </>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default CustomList;
