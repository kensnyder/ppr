<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

$tpl = file_get_contents(__DIR__ . '/ppr.tpl.php');
$tpl = str_replace('{{CSS}}', getCss(), $tpl);
$tpl = str_replace('{{JS}}', getJs(), $tpl);
file_put_contents(__DIR__ . '/../ppr.php', $tpl);

highlight_string($tpl);

function getJs() {
	$js = compressJs(file_get_contents(__DIR__ . '/assets/ppr.js'));
	return $js;
}

function compressJs($js) {
	$js = preg_replace('~//.+\n~', '', $js);
	$js = preg_replace('~\s+\n~', '', $js);
	$js = preg_replace('~[\t\r\n]~', '', $js);
	$js = preg_replace('~ (\+\=|\={1,3}) ~', '$1', $js);
	return $js;
}

function getCss() {
	$css = file_get_contents(__DIR__ . '/assets/ppr.css');
	$css = compressCss($css);
	$css = addCssDataUrls($css);
	return $css;
}

function addCssDataUrls($css) {
	$css = preg_replace_callback('/url\((.*?)\)/', function($match) {
		return "url('data:image/gif;base64," . base64_encode(file_get_contents(__DIR__ . '/assets/' . $match[1])) . "')";
	}, $css);
	return $css;
}

// from http://sandbox.kendsnyder.com/compress/cssmin.php
function compressCss($css) {    
    $css = preg_replace('~/\*.*?\*/~s','',$css);        // comments
    $css = str_replace(array("\n","\t","\r"),'',$css);  // newlines and tabs
    $css = preg_replace('/: */',':',$css);              // space after colons
    $css = preg_replace('/ *(;|\{|\}) */','$1',$css);   // space before/after semicolons and braces
    $css = str_replace(';}','}',$css);                  // remove final semicolon
    $css = trim($css);                                  // trim leading and trailing whitespace
    return $css;
}
